import express, { Router, Request, Response } from "express";
import utils from "../../utils";
import FoodCategoryController from "./index";
const router = express.Router();
const controller = new FoodCategoryController();


router.route('/foodcategory')
    .get(async function(req:Request, res: Response) {
        return res.json(await controller.getAll());
    })
    .post(async function (req:Request, res:Response) {
        return res.json(await controller.create(req.body))
    })
    ;
router.route('/foodcategory/:id')
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