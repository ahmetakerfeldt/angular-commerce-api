import {Sequelize} from "sequelize";
import {userEntity, UserModel} from "../../../models/users/users.entity";
import {deletedAccountEntity} from "../../../models/users/deleted.account.reason.entity";
import {salesEntity, SalesModel} from "../../../models/sales/all-sales.entity";
import {buysEntity, BuysModel} from "../../../models/sales/user-buys.entity";

export const DataBaseService = new class {

    storage = './database/db.sqlite3'
    private sequelize: Sequelize
    private readonly entities = [userEntity, deletedAccountEntity, salesEntity, buysEntity]

    init() {
        this.sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: this.storage
        })

        this.entities.forEach((entity)=> {
            entity(this.sequelize)
        })
    }

    associations() {
        UserModel.hasMany(SalesModel, {foreignKey:'userId'})
        SalesModel.belongsTo(UserModel, {foreignKey:'userId'})
        UserModel.hasMany(BuysModel, {foreignKey: 'userId'})
        BuysModel.belongsTo(UserModel, {foreignKey: 'userId'})

    }

    async sync() {
        return  this.sequelize.sync({force: false, alter: false})
    }

    async authenticate(){
        return  this.sequelize.authenticate().then(()=> {
            console.log('Connection successful with database.')
        }).catch(()=> {
            console.log('Connection unsuccessful with database.')
        })
    }
}
