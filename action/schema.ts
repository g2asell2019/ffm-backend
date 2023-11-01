import { mysqlTable, mysqlSchema, AnyMySqlColumn, primaryKey, int, varchar, tinyint } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"


export const main = mysqlTable("Main", {
	id: int("id").notNull(),
	nameMain: varchar("nameMain", { length: 10 }),
	stateMain: tinyint("stateMain"),
},
(table) => {
	return {
		mainId: primaryKey(table.id),
	}
});

