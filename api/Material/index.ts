import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { material } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class MaterialController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.material.findMany();
    }
    async getById(id :number){
        return await this.db.query.material.findFirst({
            where: eq(
                material.idMaterial, id
            )
        })
    }
    async create(data:modelInterface.Material){
        const isSuccess = (await this.db.insert(modelTable.material).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.Material){
        const isSuccess = await this.db
                                .update(modelTable.material)
                                .set(data as any)
                                .where(eq(material.idMaterial, id));
        return isSuccess ? await this.db.query.material.findFirst({
            where: eq(
                material.idMaterial, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(material)
                                .where(eq(material.idMaterial, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}