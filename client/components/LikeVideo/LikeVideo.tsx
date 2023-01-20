import { Button, Popover, Text } from '@mantine/core'
import { AxiosError } from 'axios'
import React, { ReactNode, useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { ThumbUp } from 'tabler-icons-react'
import { updateLikeIdVideo } from '../../api'
import { User, video } from '../../interface'

const LikeVideo = ({user, data, refetch, videoId}:{user: User, data: video | undefined, refetch: Function, videoId: string | string[] | undefined}) => {
    const likeIt = useMutation<object, AxiosError, Parameters<typeof updateLikeIdVideo>['0']>(updateLikeIdVideo, {
        onSuccess: () => {
            refetch()
        }
    })
    const [like, setLike] = useState<boolean>()
    const [likeQty, setlikeQty] = useState<ReactNode>()

    useEffect(() => {
        setlikeQty(data?.likeId.length)
        setLike(data?.likeId.includes(user._id))
    }, [data])


  return (
    <>
    {
        user ? (
            like
                ? <Button ml='xl' radius="xl" leftIcon={<ThumbUp size={14} />} size="xs" variant="light" color="dark" onClick={() => (setLike(!like), setlikeQty(Number(likeQty) - 1), likeIt.mutate({ videoId, user }))}>
                    {likeQty}
                </Button>
                :
                <Button ml='xl' radius="xl" leftIcon={<ThumbUp size={14} />} size="xs" onClick={() => (setLike(!like), setlikeQty(Number(likeQty) + 1), likeIt.mutate({ videoId, user }))}>
                    {likeQty}
                </Button>)
            :
            <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button leftIcon={<ThumbUp size={14} />} ml='xl' radius="xl" size="xs">
                        {data?.likeId.length}
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <Text size="sm">You must be logged to give like</Text>
                </Popover.Dropdown>
            </Popover>
    }</>

  )
}

export default LikeVideo