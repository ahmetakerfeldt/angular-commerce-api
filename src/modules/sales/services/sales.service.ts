import {SalesModel} from "../../../models/sales/all-sales.entity";
import {BuysModel} from "../../../models/sales/user-buys.entity";

export const SalesService = new class {

    public async saleItem(req) {
        const {user, body} = req

        return SalesModel.create({
            price: body.price,
            explanation: body.explanation,
            imagePath: body.imagePath,
            seller: user.username,
            sellerImagePath: user.imagePath,
            userId: user.id
        })
    }

    public async getMySales(req) {
        const {user} = req
        return SalesModel.findAll({where: {userId: user.id}, attributes: {exclude: ['userId', 'updatedAt']}})
    }


    async deleteSale(req) {
        const {query} = req
        return SalesModel.destroy({where: {id: query.id}})
    }

    async getSales() {
        return SalesModel.findAll()
    }


    async buyItem(req) {

        const {user, body} = req

        const saleItem = await SalesModel.scope('withUserId').findOne({
            where: {
                userId: user.id,
                price: body.price,
                explanation: body.explanation,
                createdAt: body.createdAt,
                imagePath: body.imagePath
            }
        })

        if (saleItem) {
            throw new Error('You cannot buy your item!')
        }


        return SalesModel.destroy({
            where: {
                id: body.id,
                imagePath: body.imagePath,
                price: body.price,
                explanation: body.explanation,
                createdAt: body.createdAt
            }
        }).then(() => {
            return BuysModel.create({
                price: body.price,
                explanation: body.explanation,
                userId: user.id,
                imagePath: body.imagePath,
            })
        })
    }

    async userBuys(req) {
        const {user} = req
        return BuysModel.findAll({attributes: {exclude: ['userId', 'updatedAt']}, where: {userId: user.id}})
    }


    async changeItem(req) {
        const {user, body, query} = req

        return SalesModel.update({price: body.price, explanation: body.explanation}, {
            where: {
                price: query.price,
                explanation: query.explanation,
                userId: user.id,
                id: query.id
            }
        })


    }


}
