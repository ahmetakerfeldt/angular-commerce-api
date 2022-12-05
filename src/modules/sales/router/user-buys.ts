import express, {Request} from "express";
import {decoder} from "../../../middleware/middleware";
import {SalesService} from "../services/sales.service";

const router = express.Router()


router.get('', decoder, (req: Request, res) => {
    return SalesService.userBuys(req).then((data) => {
        res.json(data)
    })
})


export default router
