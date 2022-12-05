import jwt from 'jsonwebtoken'
import {UserModel} from "../models/users/users.entity";

export const decoder = async function (req, res, next) {
    const token = req.headers?.authorization;
    if (!token) {
        return res.status(404).send('Unauthorized');
    }

    const payload = jwt.decode(token)
    if (!payload || !payload.id) {
        return res.status(404).send('Unauthorized');
    }

    const user = await UserModel.scope('hashed').findByPk(+payload.id);
    if (!user) {
        return res.status(404).send('Unauthorized');
    }

    req.user = user;
    next();
}
