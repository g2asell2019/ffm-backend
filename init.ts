import { connect } from "@planetscale/database";
import "dotenv/config";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as model from './model/model';
import * as schema from "./action/schema"
const conn = connect({
  url: process.env.DATABASE_URL as string
});
const db = drizzle(conn, {schema});
export default db;