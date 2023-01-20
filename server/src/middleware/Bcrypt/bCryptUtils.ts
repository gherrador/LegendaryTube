import bcrypt from 'bcrypt'

export const isValidPassword = async (userPassword:string, password: string) => {
    return bcrypt.compareSync(password, userPassword);
}
export const createHash = (password: string) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}



