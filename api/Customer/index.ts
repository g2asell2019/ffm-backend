import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { customer } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";

export default class CustomerController {
    private db;
    public constructor (){
        this.db = db;
    }

    async getAll(){
        return await this.db.query.customer.findMany();
    }
    async getById(id :number){
        return await this.db.query.customer.findFirst({
            where: eq(
                customer.idCustomer, id
            )
        })
    }
    async create(data:modelInterface.Customer){
        const isSuccess = (await this.db.insert(modelTable.customer).values(data as any)).rowsAffected;
        return isSuccess ? data : {};
    }
    async update(id: number,data:modelInterface.Customer){
        const isSuccess = await this.db
                                .update(modelTable.customer)
                                .set(data as any)
                                .where(eq(customer.idCustomer, id));
        return isSuccess ? await this.db.query.customer.findFirst({
            where: eq(
                customer.idCustomer, id
            )
        }) : {};
    }
    async delete(id: number){
        const isSuccess = await this.db
                                .delete(customer)
                                .where(eq(customer.idCustomer, id));
        const result = isSuccess ? true : false;

        return {"success": result};
    }
}