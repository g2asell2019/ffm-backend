import { eq, gte, lt, lte, asc, desc, and } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { food } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class FoodController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.food.findMany();
    }
    async getById(id :number){
        return await this.db.query.food.findFirst({
            where: eq(
                food.idFood, id
            )
        })
    }
    async getByCategoryId(id :number){
        return await this.db.query.food.findMany({
            where: eq(
                food.idFc, id
            )
        })
    }
    async create(data:modelInterface.Food){
        const isSuccess = (await this.db.insert(modelTable.food).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.Food){
        const isSuccess = await this.db
                                .update(modelTable.food)
                                .set(data as any)
                                .where(eq(food.idFood, id));
        return isSuccess ? await this.db.query.food.findFirst({
            where: eq(
                food.idFood, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(food)
                                .where(eq(food.idFood, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
    async findByPrice(min: number, max:number)
    {
        min = !isNaN(min) ? min : -1;
        max = !isNaN(max) ? max : 99999999999999999;

        return await this.db.select().from(modelTable.food)
            .where(and(gte(modelTable.food.price, min), lte(modelTable.food.price, max)))
            .orderBy(asc(modelTable.food.price));
    }
    async sortByPrice(ascending: boolean){
        if (ascending) {
            return await this.db.select().from(modelTable.food)
            .orderBy(asc(modelTable.food.price));
        }
        
        return await this.db.select().from(modelTable.food)
        .orderBy(desc(modelTable.food.price));
    }
}