import express from "express";
import jwt from 'jsonwebtoken'
import {AuthService} from "../services/auth.service";

const router = express.Router()

router.post('', (req, res) => {
    return AuthService.login(req.body).then((user) => {

        const {id, imagePath} = user.toJSON()

        const token = jwt.sign({
            id: id,
            exp: Math.floor(Date.now() / 1000) + 60,
        }, ':XV12:a23++w1C.')
        res.json({token: token, imagePath: imagePath})

    }).catch((err) => {
        if (!err?.errs || !err.erros.length) {
            res.status(401).send((`${err}`));
            return;
        }
    })
})


export default router
