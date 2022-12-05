import * as Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import {HookReturn} from "sequelize/types/hooks";

export class UserModel extends Sequelize.Model {
}

export const userEntity = (sequelize) => {

    UserModel.init({

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Username cannot be empty!'
                },
                len: {
                    args: [4, 20],
                    msg: 'Username must be 4-20 character.'
                },
            }
        },

        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Password cannot be empty!'
                },
                len: {
                    args: [5, 1000],
                    msg: 'Password length must be at least 5.'
                }
            }
        },

        imagePath: {
            type: Sequelize.STRING,
            defaultValue: 'default.jpg'
        }



    }, {

        hooks: {

            beforeUpdate(attributes, options): HookReturn {
                const password = attributes.get('password')
                const salt = bcrypt.genSaltSync(15)
                const hash = bcrypt.hashSync(password, salt)
                attributes.set('password', hash)
            },

            beforeCreate(attributes, options): HookReturn {
                const password = attributes.get('password')
                const salt = bcrypt.genSaltSync(15)
                const hash = bcrypt.hashSync(password, salt)
                attributes.set('password', hash)
            }
        },

        sequelize,
        tableName: 'user',
        modelName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        scopes: {
            hashed: {
                attributes: {
                    include: ['password']
                }
            }
        }
    })


}
