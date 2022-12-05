import express, {Request} from "express";
import {decoder} from "../../../middleware/middleware";
import {SettingsService} from "../services/settings.service";

const router = express.Router()


router.post('', decoder, (req: Request, res) => {

    return SettingsService.deleteAccount(req).then(() => {
        res.status(200).json('Your account deleted.')
    }).catch((err) => {
        if (!err?.errs || !err.erros.length) {
            res.status(404).json((`${err}`));
            return;
        }
    })
})


export default router
