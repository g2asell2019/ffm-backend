import "dotenv/config";
import express, { Router } from "express";
import 'express-async-errors';
import bodyParser from "body-parser";

var CustomerRouter = require('./api/Customer/route');
var FoodCategoryRouter = require('./api/FoodCategory/route');
var MaterialCategoryRouter = require('./api/MaterialCategory/route');
var MaterialRouter = require('./api/Material/route');
var FoodController = require('./api/Food/route');
var CouponController = require('./api/Coupon/route');
var EmployeeController = require('./api/Employee/route');

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.text());
app.set('json spaces', '  ')


app.use("/api", CustomerRouter as Router);
app.use("/api", FoodCategoryRouter as Router);
app.use("/api", MaterialCategoryRouter as Router);
app.use("/api", MaterialRouter as Router);
app.use("/api", FoodController as Router);
app.use("/api", CouponController as Router);
app.use("/api", EmployeeController as Router);
app.use("/uploads/images", express.static("./content/images"));
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));