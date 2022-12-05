import {UserModel} from "../../../models/users/users.entity";
import bcrypt from 'bcryptjs'

export const AuthService = new class {

    public async register(body) {
        return UserModel.create(body)
    }

    public async login(body) {
        const user = await UserModel.scope('hashed').findOne({where: {username: body.username}})

        if (!user) {
            throw new Error('User not found.')
        }
        const {password} = user.toJSON()
        const comparePassword = await bcrypt.compare(body.password, password)
        console.log('password: ', comparePassword)
        if (!comparePassword) {
            throw new Error('User not found.')
        }
        return user;
    }
}
