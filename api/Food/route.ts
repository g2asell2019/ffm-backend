import express, { Router, Request, Response } from "express";
import utils from "../../utils";
import FoodController from "./index";
const path = require('path');
const { writeFile } = require("fs/promises");
const router = express.Router();
const controller = new FoodController();
const dirpath = './content/images/'

router.route('/food/findByPrice/')
.get(async function(req:Request, res: Response) {
    let {min, max} = req.query;
    
    return res.json(await controller.findByPrice(Number(min), Number(max)));
})
router.route('/food/sortByPrice/')
.get(async function(req:Request, res: Response) {
    const {ascending} = req.query;
    let sortby = ascending === "true" ? true : false;
    return res.json(await controller.sortByPrice(sortby));
})
router.route('/food')
    .get(async function(req:Request, res: Response) {
        const { id_category } = req.query;
        let id = utils.isNumeric(id_category + "") && parseInt(id_category + "");
        if (id) {
            return res.json(await controller.getByCategoryId(id));
        }
        return res.json(await controller.getAll());
    })
    .post(async function (req:Request, res:Response) {
        if (req.body["image"] != null) {
            const contents = req.body["image"].replace(/^data:([A-Za-z-+/]+);base64,/, '');
            const ext = req.body["image"].substring(req.body["image"].indexOf("/")+1, req.body["image"].indexOf(";base64"));
            const filename = `${Date.now()}.${ext}`;
            await writeFile(path.join(dirpath, filename), Buffer.from(contents, 'base64'));
            req.body["image"] = filename;
        }
        return res.json(await controller.create(req.body))
    })
    ;
router.route('/food/:id')
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
        if (req.body["image"] != null) {
            const contents = req.body["image"].replace(/^data:([A-Za-z-+/]+);base64,/, '');
            const ext = req.body["image"].substring(req.body["image"].indexOf("/")+1, req.body["image"].indexOf(";base64"));
            const filename = `${Date.now()}.${ext}`;
            await writeFile(path.join(dirpath, filename), Buffer.from(contents, 'base64'));
            req.body["image"] = filename;
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