import express, { Router, Request, Response } from "express";
import utils from "../../utils";
import MaterialController from "./index";
const router = express.Router();
const controller = new MaterialController();


router.route('/material')
    .get(async function(req:Request, res: Response) {
        return res.json(await controller.getAll());
    })
    .post(async function (req:Request, res:Response) {
        return res.json(await controller.create(req.body))
    })
    ;
router.route('/material/:id')
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