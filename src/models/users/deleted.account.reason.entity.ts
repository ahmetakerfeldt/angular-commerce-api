import * as Sequelize from 'sequelize'


export class DeletedAccountModel extends Sequelize.Model {

}

export const deletedAccountEntity = (sequelize) => {

    DeletedAccountModel.init({

        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        username: {
          type: Sequelize.STRING
        },

        reason: {
            type: Sequelize.STRING
        }


    }, {
        sequelize,
        tableName: 'deleted-account',
        modelName: 'deleted-account',
        createdAt: true,
        updatedAt: false
    })


}
