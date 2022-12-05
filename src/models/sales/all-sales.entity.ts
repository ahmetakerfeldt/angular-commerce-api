import * as Sequelize from 'sequelize'


export class SalesModel extends Sequelize.Model {

}

export const salesEntity = (sequelize) => {


    SalesModel.init({

        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },


        price: {
            type: Sequelize.STRING
        },

        explanation: {
            type: Sequelize.STRING
        },

        imagePath: {
            type: Sequelize.STRING,
            defaultValue: 'default.jpg'
        },

        seller: {
            type: Sequelize.STRING
        },

        sellerImagePath: {
            type: Sequelize.STRING
        }


    }, {
        sequelize,
        tableName: 'all-sales',
        modelName: 'all-sales',
        createdAt: true,
        updatedAt: true,
        defaultScope: {
            attributes: {
                exclude: ['userId', 'updatedAt']
            }
        },
        scopes: {
            withUserId: {
                attributes: {
                    include: ['userId']
                }
            }
        }
    })
}
