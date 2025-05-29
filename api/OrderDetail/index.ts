import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { orderDetail } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class CouponController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.orderDetail.findMany();
    }
    async getById(id :number){
        return await this.db.query.orderDetail.findFirst({
            where: eq(
                orderDetail.idOrderDetail, id
            )
        })
    }
    async getByIdOrder(id :number){
        return await this.db.query.orderDetail.findMany({
            where: eq(
                orderDetail.idOrder, id
            )
        })
    }
    async create(data:modelInterface.OrderDetail){
        const isSuccess = (await this.db.insert(modelTable.orderDetail).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.OrderDetail){
        const isSuccess = await this.db
                                .update(modelTable.orderDetail)
                                .set(data as any)
                                .where(eq(orderDetail.idOrderDetail, id));
        return isSuccess ? await this.db.query.orderDetail.findFirst({
            where: eq(
                orderDetail.idOrderDetail, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(orderDetail)
                                .where(eq(orderDetail.idOrderDetail, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}