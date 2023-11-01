import { mysqlTable, primaryKey, int, varchar, tinyint } from "drizzle-orm/mysql-core";


export const temp = mysqlTable("Temp", {
	id: int("id").notNull(),
	nameTemp: varchar("nameTemp", { length: 20 }),
	state: tinyint("state"),
},
	(table) => {
		return {
			tempId: primaryKey(table.id),
		};
	});
