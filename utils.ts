import jwt, {Secret} from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config";

const SECRET_KEY:Secret = process.env.JWT_SECRET || "emptystring";
import { Router, Request, Response } from "express";
const createToken = (_id: string) => {
    return jwt.sign({ _id }, SECRET_KEY , {
      expiresIn: "1d",
    });
};
function isNumeric(value:string) {
    return /^\d+$/.test(value);
}

export default {
    isNumeric: isNumeric,
    createToken: createToken
}