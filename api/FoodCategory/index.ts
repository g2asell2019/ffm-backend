import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { foodCategory } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class FoodCategoryController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.foodCategory.findMany();
    }
    async getById(id :number){
        return await this.db.query.foodCategory.findFirst({
            where: eq(
                foodCategory.idFc, id
            )
        })
    }
    async create(data:modelInterface.FoodCategory){
        const isSuccess = (await this.db.insert(modelTable.foodCategory).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.FoodCategory){
        const isSuccess = await this.db
                                .update(modelTable.foodCategory)
                                .set(data as any)
                                .where(eq(foodCategory.idFc, id));
        return isSuccess ? await this.db.query.foodCategory.findFirst({
            where: eq(
                foodCategory.idFc, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(foodCategory)
                                .where(eq(foodCategory.idFc, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}