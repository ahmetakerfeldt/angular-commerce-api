import express, {Request} from "express";
import {decoder} from "../../../middleware/middleware";
import {SalesService} from "../services/sales.service";

const router = express.Router()

router.patch('', decoder, (req: Request, res) => {
    return SalesService.changeItem(req).then(() => {
        res.json('ok')
    })
})


export default router
