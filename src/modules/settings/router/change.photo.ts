import express, {Request} from "express";
import multer from 'multer'
import {SettingsService} from "../services/settings.service";
import {decoder} from "../../../middleware/middleware";

const router = express.Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/profile-photos')
    },
    filename: function (req, file, cb) {
        const originalNameArr = file.originalname.split('.');
        const ext = originalNameArr[originalNameArr.length - 1];

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

const upload = multer({storage: storage})


router.get('', decoder, (req: Request, res) => {
    return SettingsService.getPhoto(req).then((path) => {
        res.json(path)
    })
})


router.post('', upload.single('image'), decoder, (req: Request, res) => {

    return SettingsService.setPhoto(req).then(() => {
        res.json('You successfully change your profile photo! ')
    })


})


router.delete('', decoder, (req: Request, res) => {
    return SettingsService.deletePhoto(req).then(()=>{

        res.json('ok')
    }).catch((err)=> {
        if (!err?.errs || !err.erros.length) {
            res.status(404).json((`${err}`));
            return;
        }
    })


})


export default router
