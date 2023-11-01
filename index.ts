import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { temp } from "./drizzle/temp";

const conn = connect({
  url: process.env.DATABASE_URL
});
const db = drizzle(conn);

let result = db.select().from(temp);

console.log(JSON.stringify(result));