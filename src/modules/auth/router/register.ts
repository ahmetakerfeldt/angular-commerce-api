import express from "express";
import {AuthService} from "../services/auth.service";

const router = express.Router()

router.post('', (req, res) => {
    return AuthService.register(req.body).then(() => {
        res.json('You registered successful.')
        res.status(201)
    }).catch((err) => {
        const error = err.errors.map((e) => e.message)
        res.status(404).send((`${error}`))
    })
})

export default router
