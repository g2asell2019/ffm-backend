import express, { Router, Request, Response } from "express";
import utils from "../../utils";
import CouponController from "./index";
const router = express.Router();
const controller = new CouponController();


router.route('/order')
    .get(async function(req:Request, res: Response) {
        const { id_customer } = req.query;
        let id = utils.isNumeric(id_customer + "") && parseInt(id_customer + "");
        if (id) {
            return res.json(await controller.getByIdCustomer(id));
        }
        return res.json(await controller.getAll());
    })
    .post(async function (req:Request, res:Response) {
        return res.json(await controller.create(req.body))
    })
    ;
router.route('/order/:id')
    .get (async function (req:Request, res:Response) {
        let id = utils.isNumeric(req.params["id"]) && parseInt(req.params["id"]);;
        if (!id) {
            return res.status(404)
        }
        return res.json(await controller.getById(id))
    }).
    patch(async function (req:Request, res:Response) {
        let id = utils.isNumeric(req.params["id"]) && parseInt(req.params["id"]);;
        if (!id) {
            return res.status(404)
        }
        return res.json(await controller.update(id, req.body))
    }).
    delete(async function (req:Request, res:Response) {
        let id = utils.isNumeric(req.params["id"]) && parseInt(req.params["id"]);;
        if (!id) {
            return res.status(404)
        }
        return res.json(await controller.delete(id))
    });
      
module.exports = router;