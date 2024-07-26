import "dotenv/config";
import { Config } from "drizzle-kit";

export default {
  schema: "./drizzle/*.ts",
  out: "./action/",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
  },
  driver: "mysql2"
} satisfies Config;