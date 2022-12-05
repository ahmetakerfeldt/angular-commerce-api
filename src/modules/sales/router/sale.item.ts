import express, {Request} from "express";
import multer from 'multer'
import {decoder} from "../../../middleware/middleware";
import {SalesService} from "../services/sales.service";

const router = express.Router()


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './assets/sales-photos')
    },

    filename: function (req, file, cb) {
        const originalNameArr = file.originalname.split('.');
        const ext = originalNameArr[originalNameArr.length - 1];

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
    }
})

const upload = multer({storage: storage})

//upload a file with multer
router.post('/upload', decoder, upload.single('image'), (req: Request, res) => {
    const {file} = req
    res.json(file.filename)
})


router.post('', decoder, (req: Request, res) => {

    return SalesService.saleItem(req).then(() => {
        res.json('Your item successfully uploaded!')
    })


})


export default router
