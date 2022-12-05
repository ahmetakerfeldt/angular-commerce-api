import express from "express";
import {decoder} from "../../../middleware/middleware";
import {SalesService} from "../services/sales.service";


const router = express.Router()

router.get('', decoder, (req, res) => {

    return SalesService.getSales().then((data) => {
        res.json(data)
    })
})


router.patch('', decoder, (req, res) => {
    return SalesService.buyItem(req).then(() => {
        res.json('You successfully buy item!')
    }).catch((err) => {
        if (!err?.errs || !err.erros.length) {
            res.json((`${err}`));
            return;
        }
    })
})


export default router
