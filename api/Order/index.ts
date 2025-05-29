import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { orderFood } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class CouponController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.orderFood.findMany();
    }
    async getById(id :number){
        return await this.db.query.orderFood.findFirst({
            where: eq(
                orderFood.idOrder, id
            )
        })
    }
    async getByIdCustomer(id :number){
        return await this.db.query.orderFood.findMany({
            where: eq(
                orderFood.idCustomer, id
            )
        })
    }
    async create(data:modelInterface.OrderFood){
        const isSuccess = (await this.db.insert(modelTable.orderFood).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.OrderFood){
        const isSuccess = await this.db
                                .update(modelTable.orderFood)
                                .set(data as any)
                                .where(eq(orderFood.idOrder, id));
        return isSuccess ? await this.db.query.orderFood.findFirst({
            where: eq(
                orderFood.idOrder, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(orderFood)
                                .where(eq(orderFood.idOrder, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}