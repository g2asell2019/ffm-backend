import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { employee } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class EmployeeController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.employee.findMany();
    }
    async getById(id :number){
        return await this.db.query.employee.findFirst({
            where: eq(
                employee.idEmployee, id
            )
        })
    }
    async create(data:modelInterface.Employee){
        const isSuccess = (await this.db.insert(modelTable.employee).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.Employee){
        const isSuccess = await this.db
                                .update(modelTable.employee)
                                .set(data as any)
                                .where(eq(employee.idEmployee, id));
        return isSuccess ? await this.db.query.employee.findFirst({
            where: eq(
                employee.idEmployee, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(employee)
                                .where(eq(employee.idEmployee, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}