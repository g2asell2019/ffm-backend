import "dotenv/config";
import express, { Router } from "express";
import 'express-async-errors';
import bodyParser from "body-parser";

var CustomerRouter = require('./api/Customer/route');

const app = express();
const port = process.env.PORT || 3030;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.set('json spaces', '  ')


app.use("/api", CustomerRouter as Router);
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));