import { eq } from "drizzle-orm";
import * as modelInterface from '../../model/model';
import { customer } from "../../action/schema";
import * as modelTable from "../../drizzle/database"
import db from "../../init";
import validator from "validator";
import "dotenv/config";

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
        var result = (await this.db.insert(modelTable.customer).values(data as any));
        const isSuccess = result.rowsAffected;
        data.Id_Customer = parseInt(result.insertId);
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

    //signin user
    async userLogin(data:any) {
    const { email, password } = data;
    try {
      //Validateion
      if (!email || !password) {
        return {
          success: false,
          message: "Email hoặc Mật khẩu không đúng!!!",
        };
      }
      if (!validator.isEmail(email)) {
        return { message: "Email không hợp lệ!!!" };
      }
      const user = await db.query.customer.findFirst({
        where: (eq(customer.email,email))
      })
      if (!user) {
        return {
          success: false,
          message: "Email chưa được đăng ký!!!",
        };
      }
      const isMatch = password === user.password;
      if (!isMatch) {
        return {
          success: false,
          message: "Mật khẩu không đúng!!!",
        };
      }

      return user;
    } catch (error: any) {
        return {
        success: false,
        message: "Đăng nhập thất bại!!!",
        error: error.message,
      };
    }
    };

    async userSignup (data:any) {
        const { email, password } = data;
        try {
          if ( !email || !password) {
            return { message: "Vui lòng điền đầy đủ thông tin!!!" };
          }
      
          if (!validator.isEmail(email)) {
            return { message: "Email không hợp lệ!!!" };
          }
      
          if (!validator.isLength(password, { min: 6 })) {
            return { message: "Mật khẩu phải có ít nhất 6 ký tự!!!" };
          }
      
          //check user
          const exisitingUser = await db.query.customer.findFirst({
            where: (eq(customer.email,email))
          })
          //exisiting user
          if (exisitingUser) {
            return {
              success: false,
              message: "Email đã tồn tại!!!",
            };
          }
          
          const user =  await this.create(data);
          return user;
          
        } catch (err) {
          return {
            success: false,
            message: "Đăng ký thất bại!!!",
            err,
          };
        }
      };
}