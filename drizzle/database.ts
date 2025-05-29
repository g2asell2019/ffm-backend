import { date, float, int, mysqlTable, primaryKey, tinyint, varchar } from "drizzle-orm/mysql-core";

export const coupon = mysqlTable("Coupon", {
	idCoupon: int("Id_Coupon").autoincrement().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	discount: float("Discount").notNull(),
},
	(table) => {
		return {
			couponIdCoupon: primaryKey(table.idCoupon),
		};
	});


export const customer = mysqlTable("Customer", {
	idCustomer: int("Id_Customer").autoincrement().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	email: varchar("Email", { length: 100 }),
	password: varchar("Password", { length: 100 }).notNull(),
	phone: varchar("Phone", { length: 100 }),
	address: varchar("Address", { length: 100 }).notNull(),
	point: int("Point"),
	paymentMethod: varchar("PaymentMethod", { length: 100 }),
},
	(table) => {
		return {
			customerIdCustomer: primaryKey(table.idCustomer),
		}
	});

export const employee = mysqlTable("Employee", {
	idEmployee: int("Id_Employee").autoincrement().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	address: varchar("Address", { length: 100 }).notNull(),
	phone: varchar("Phone", { length: 100 }),
	role: varchar("Role", { length: 100 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dayOfWork: date("DayOfWork", { mode: 'string' }),
},
	(table) => {
		return {
			employeeIdEmployee: primaryKey(table.idEmployee),
		}
	});

export const feedBack = mysqlTable("FeedBack", {
	idFeedBack: int("Id_FeedBack").autoincrement().notNull(),
	title: varchar("Title", { length: 100 }),
	content: varchar("Content", { length: 100 }).notNull(),
	idCustomer: int("Id_Customer").notNull(),
},
	(table) => {
		return {
			feedBackIdFeedBack: primaryKey(table.idFeedBack),
		}
	});

export const food = mysqlTable("Food", {
	idFood: int("Id_Food").autoincrement().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	des: varchar("Des", { length: 100 }),
	price: float("Price").notNull(),
	quantity: int("Quantity").notNull(),
	idFc: int("Id_FC").notNull(),
	idMaterial: int("Id_Material").notNull(),
	image: varchar("Image", { length: 4000 })
},
	(table) => {
		return {
			foodIdFood: primaryKey(table.idFood),
		}
	});

export const foodCategory = mysqlTable("Food_Category", {
	idFc: int("Id_FC").autoincrement().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
},
	(table) => {
		return {
			foodCategoryIdFc: primaryKey(table.idFc),
		}
	});

export const foodMaterial = mysqlTable("Food_Material", {
	foodIdFood: int("Food_Id_Food").notNull(),
	materialIdMaterial: int("Material_Id_Material").notNull(),
},
	(table) => {
		return {
			foodMaterialFoodIdFoodMaterialIdMaterial: primaryKey(table.foodIdFood, table.materialIdMaterial),
		}
	});

export const material = mysqlTable("Material", {
	idMaterial: int("Id_Material").autoincrement().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
	quantity: int("Quantity").notNull(),
	price: float("Price").notNull(),
	idMc: int("Id_MC").notNull(),
},
	(table) => {
		return {
			materialIdMaterial: primaryKey(table.idMaterial),
		}
	});

export const materialCategory = mysqlTable("Material_Category", {
	idMc: int("Id_MC").autoincrement().notNull(),
	name: varchar("Name", { length: 100 }).notNull(),
},
	(table) => {
		return {
			materialCategoryIdMc: primaryKey(table.idMc),
		}
	});

export const orderFood = mysqlTable("OrderFood", {
	idOrder: int("Id_Order").autoincrement().notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	dayOrder: date("DayOrder", { mode: 'string' }).notNull(),
	totalQuantity: int("TotalQuantity").notNull(),
	totalPrice: float("TotalPrice").notNull(),
	idCustomer: int("Id_Customer").notNull(),
	idEmployee: int("Id_Employee").notNull(),
	idCoupon: int("Id_Coupon"),
},
	(table) => {
		return {
			orderFoodIdOrder: primaryKey(table.idOrder),
		}
	});

export const orderDetail = mysqlTable("Order_Detail", {
	idOrderDetail: int("Id_OrderDetail").autoincrement().notNull(),
	idFood: int("Id_Food").notNull(),
	quantity: int("Quantity").notNull(),
	price: float("Price").notNull(),
	idOrder: int("Id_Order").notNull(),
},
	(table) => {
		return {
			orderDetailIdOrderDetail: primaryKey(table.idOrderDetail),
		}
	});

export const workSchedule = mysqlTable("WorkSchedule", {
	idWorkSchedule: int("Id_WorkSchedule").autoincrement().notNull(),
	workDate: int("WorkDate").notNull(),
	breakDate: int("BreakDate"),
	active: tinyint("Active").notNull(),
	idEmployee: int("Id_Employee").notNull(),
},
	(table) => {
		return {
			workScheduleIdWorkSchedule: primaryKey(table.idWorkSchedule),
		}
	});