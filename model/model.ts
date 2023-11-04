// Define the TypeScript models for each table
export interface Coupon {
  Id_Coupon: number;
  Name: string;
  Discount: number;
}
export interface Customer {
  Id_Customer: number;
  Name: string;
  Email?: string;
  Password: string;
  Phone?: string;
  Address: string;
  Point?: number;
  PaymentMethod?: string;
}
export interface Employee {
  Id_Employee: number;
  Name: string;
  Address: string;
  Phone?: string;
  Role: string;
  DayOfWork?: string; // Use 'Date' if you want to store dates.
}
export interface FeedBack {
  Id_FeedBack: number;
  Title?: string;
  Content: string;
  Id_Customer: number;
}
export interface Food {
  Id_Food: number;
  Name: string;
  Des?: string;
  Price: number;
  Quantity: number;
  Id_FC: number;
  Id_Material: number;
}
export interface FoodCategory {
  Id_FC: number;
  Name: string;
}
export interface FoodMaterial {
  Food_Id_Food: number;
  Material_Id_Material: number;
}
export interface Material {
  Id_Material: number;
  Name: string;
  Quantity: number;
  Price: number;
  Id_MC: number;
}
export interface MaterialCategory {
  Id_MC: number;
  Name: string;
}
export interface OrderFood {
  Id_Order: number;
  DayOrder: string; // Use 'Date' if you want to store dates.
  TotalQuantity: number;
  TotalPrice: number;
  Id_Customer: number;
  Id_Employee: number;
  Id_Coupon?: number;
}
export interface OrderDetail {
  Id_OrderDetail: number;
  Id_Food: number;
  Quantity: number;
  Price: number;
  Id_Order: number;
}
export interface WorkSchedule {
  Id_WorkSchedule: number;
  WorkDate: number;
  BreakDate?: number;
  Active: number;
  Id_Employee: number;
}
