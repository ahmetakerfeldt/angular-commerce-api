import bcrypt from 'bcryptjs'
import {Request} from "express";
import {UserModel} from "../../../models/users/users.entity";
import {DeletedAccountModel} from "../../../models/users/deleted.account.reason.entity";
import {SalesModel} from "../../../models/sales/all-sales.entity";

export const SettingsService = new class {

    public async changePassword(req: Request) {
        const {user, body} = req;

        const password = user.toJSON().password
        const comparePassword = await bcrypt.compare(body.oldPassword, password)

        if (!comparePassword) {
            throw new Error('Old password incorrectly!')
        }

        if (body.newPassword == body.oldPassword) {
            throw new Error('Your old password cannot be the same as your new password!')
        }

        return user.update({password: body.newPassword});
    }

    public async changeUsername(req: Request) {
        const {user, body} = req;

        const alreadyExist = await UserModel.findOne({where: {username: body.newUsername}})

        if (req.body.newUsername == req.user.toJSON().username) {
            throw new Error('This username already yours!')
        }


        if (alreadyExist) {
            throw new Error('Username already taken!')
        }


        const password = user.toJSON().password
        const comparePassword = await bcrypt.compare(body.password, password)

        if (!comparePassword) {
            throw new Error('You entered password incorrectly!')
        }

        return user.update({username: body.newUsername, password: body.password}).then(()=> {
            return SalesModel.update({seller: body.newUsername}, {where: {userId: user.id}})
        })
    }


    public async deleteAccount(req: Request) {

        const {user, body} = req

        const password = user.toJSON().password
        const comparePassword = await bcrypt.compare(body.password, password)

        if (!comparePassword) {
            throw new Error('You entered password incorrectly!')
        }

        body.username = user.toJSON().username

        return UserModel.destroy({where: {id: user.id}}).then(() => {
            return DeletedAccountModel.create(body)
        })
    }

    public async getPhoto(req: Request) {
        const {user} = req
        return user.toJSON().imagePath
    }


    public async setPhoto(req: Request) {

        const {user, body, file} = req


        return UserModel.update({imagePath: file.filename}, {where: {id: user.id}})

    }


    public async deletePhoto(req: Request) {

        const {user} = req

        if (user.imagePath == 'default.jpg') {
            throw new Error('You don\'t have a profile picture yet!')
        }


        return UserModel.update({imagePath: 'default.jpg'}, {where: {id: user.id}})
    }

}
