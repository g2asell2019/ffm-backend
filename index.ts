import "dotenv/config";

const statement = sql`select * from Customer `;
db.execute(statement).then((value) => {
  const customer: model.Customer[] = value.rows as model.Customer[];
  
  console.log(customer[0].Name);
});