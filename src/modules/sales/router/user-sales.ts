import express, {Request} from "express";
import {decoder} from "../../../middleware/middleware";
import {SalesService} from "../services/sales.service";


const router = express.Router()



router.get('',decoder, (req: Request, res) => {
    return SalesService.getMySales(req).then((data)=> {
        res.json(data)
    })
})



router.delete('',decoder, (req: Request, res) => {
    return SalesService.deleteSale(req).then(()=> {
        res.json('ok')
    })
} )




export default router
