import { Avatar, Box, Flex, Text, TextInput, Button } from "@mantine/core"
import { useForm } from '@mantine/form';
import { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import { getComment, setComment } from "../../api";
import {  UserLoged } from "../../context";
import { comment } from "../../interface";
import Moment from "react-moment";
import { QueryKeys } from "../../types";

const Comments = ({ postId }: { postId: string }) => {
    const { user } = UserLoged()
    const form = useForm({
        initialValues: {
            content: '',
            writer: user
        }
    })
    const { data, refetch } = useQuery({ queryKey: [QueryKeys.comments, postId], queryFn: () => getComment(postId) })

    const mutation = useMutation<string, AxiosError, Parameters<typeof setComment>['0']>(setComment, {
        onSuccess() {
            form.reset()
            refetch()
        },
    })

    return (
        <Box mt='md'>
            {user ? <Flex align='center'>
                    <Avatar src={user.photo} mr='md' color="cyan" radius="xl"></Avatar>
                    <form onSubmit={form.onSubmit((values) => mutation.mutate({ postId, ...values }))}>
                        <Flex>
                            <TextInput style={{ 'width': '40vw' }}
                                placeholder='Input your comment here'
                                {...form.getInputProps('content')}
                            />
                            <Button ml='xl' type='submit'>Send</Button>
                        </Flex>
                    </form>
            </Flex> : null}
            {(data || []).map((comment: comment) => {
                return (
                    <Flex mt='lg' key={comment._id}>
                        <Avatar src={comment.writer.photo} mr='md' color="cyan" radius="xl"></Avatar>
                        <Flex direction='column'>
                            <Flex>
                                <Text weight={700} mr='xs'>{comment.writer.displayName}</Text>
                                <Text><Moment fromNow>{comment.updatedAt}</Moment></Text>
                            </Flex>
                            <Text>{comment.content}</Text>
                        </Flex>
                    </Flex>
                )
            })}
        </Box>
    )
}

export default Comments