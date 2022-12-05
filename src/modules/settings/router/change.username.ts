import express, {Request} from "express";
import {decoder} from "../../../middleware/middleware";
import {SettingsService} from "../services/settings.service";

const router = express.Router()


router.patch('', decoder, (req: Request, res) => {
    return SettingsService.changeUsername(req).then(() => {
        res.json('You successfully changed username.')
    }).catch((err) => {
        if (!err?.errs || !err.erros.length) {
            res.status(404).json((`${err}`));
            return;
        }
    })
})


export default router
