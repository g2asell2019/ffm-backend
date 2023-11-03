import { connect } from "@planetscale/database";
import "dotenv/config";
import { sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import * as schema from './drizzle/database'
import * as model from './model/model'


const conn = connect({
  url: process.env.DATABASE_URL as string
});
const db = drizzle(conn);

const statement = sql`select * from Customer `;
db.execute(statement).then((value) => {
  const customer: model.Customer[] = value.rows as model.Customer[];
  
  console.log(customer[0].Name);
});