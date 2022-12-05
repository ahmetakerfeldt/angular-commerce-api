import * as Sequelize from 'sequelize'


export class BuysModel extends Sequelize.Model {

}


export const buysEntity = (sequelize) => {

    BuysModel.init({
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
        }
    }, {
        sequelize,
        modelName: 'user-buys',
        tableName: 'user-buys'
    })


}
