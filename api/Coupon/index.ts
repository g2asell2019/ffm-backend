import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { coupon } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class CouponController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.coupon.findMany();
    }
    async getById(id :number){
        return await this.db.query.coupon.findFirst({
            where: eq(
                coupon.idCoupon, id
            )
        })
    }
    async create(data:modelInterface.Coupon){
        const isSuccess = (await this.db.insert(modelTable.coupon).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.Coupon){
        const isSuccess = await this.db
                                .update(modelTable.coupon)
                                .set(data as any)
                                .where(eq(coupon.idCoupon, id));
        return isSuccess ? await this.db.query.coupon.findFirst({
            where: eq(
                coupon.idCoupon, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(coupon)
                                .where(eq(coupon.idCoupon, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}