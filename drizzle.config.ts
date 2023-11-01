import { Config } from "drizzle-kit";
import "dotenv/config";

export default {
  schema: "./drizzle/*",
  out: "./action/",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string
  },
  driver: "mysql2"
} satisfies Config;