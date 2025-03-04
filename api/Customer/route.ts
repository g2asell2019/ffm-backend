import express, { Router, Request, Response } from "express";
import CustomerController from "./index";
import utils from "../../utils";
import { Customer } from "../../model/model";
const router = express.Router();
const controller = new CustomerController();

router.route('/customer')
    .get(async function(req:Request, res: Response) {
        return res.json(await controller.getAll());
    })
    .post(async function (req:Request, res:Response) {
        return res.json(await controller.create(req.body))
    })
    ;
router.route('/customer/:id')
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
    
router.route('/customer/login')
    .post(async function (req:Request, res:Response) {
        const user:any = await controller.userLogin(req.body);
        if (user["idCustomer"]) {
            res.cookie("idCustomer", user["idCustomer"], {
              path: "/",
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 86400),
            });
        }
        return res.json(user);
    })
;
router.route('/customer/signup')
    .post(async function (req:Request, res:Response) {
        const user:any = await controller.userSignup(req.body);
          if (user["Id_Customer"]) {
            res.cookie("idCustomer", user["Id_Customer"], {
              path: "/",
              httpOnly: true,
              expires: new Date(Date.now() + 1000 * 86400),
            });
        }
        return res.json(user);
    })
;
  
module.exports = router;