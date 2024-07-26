import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { materialCategory } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class MaterialCategoryController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.materialCategory.findMany();
    }
    async getById(id :number){
        return await this.db.query.materialCategory.findFirst({
            where: eq(
                materialCategory.idMc, id
            )
        })
    }
    async create(data:modelInterface.MaterialCategory){
        const isSuccess = (await this.db.insert(modelTable.materialCategory).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.MaterialCategory){
        const isSuccess = await this.db
                                .update(modelTable.materialCategory)
                                .set(data as any)
                                .where(eq(materialCategory.idMc, id));
        return isSuccess ? await this.db.query.materialCategory.findFirst({
            where: eq(
                materialCategory.idMc, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(materialCategory)
                                .where(eq(materialCategory.idMc, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}