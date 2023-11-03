// Define the TypeScript models for each table

// coupon model
export interface Coupon {
    idCoupon: number;
    name: string;
    discount: number;
}

// customer model
export interface Customer {
    idCustomer: number;
    Name: string;
    email: string | null;
    password: string;
    phone: string | null;
    address: string;
    point: number | null;
    paymentMethod: string | null;
}

// employee model
export interface Employee {
    idEmployee: number;
    name: string;
    address: string;
    phone: string | null;
    role: string;
    dayOfWork: string | null; // You can use 'Date' here if needed
}

// feedback model
export interface FeedBack {
    idFeedBack: number;
    title: string | null;
    content: string;
    idCustomer: number;
}

// food model
export interface Food {
    idFood: number;
    name: string;
    des: string | null;
    price: number;
    quantity: number;
    idFc: number;
    idMaterial: number;
}

// foodCategory model
export interface FoodCategory {
    idFc: number;
    name: string;
}

// foodMaterial model
export interface FoodMaterial {
    foodIdFood: number;
    materialIdMaterial: number;
}

// material model
export interface Material {
    idMaterial: number;
    name: string;
    quantity: number;
    price: number;
    idMc: number;
}

// materialCategory model
export interface MaterialCategory {
    idMc: number;
    name: string;
}

// orderFood model
export interface OrderFood {
    idOrder: number;
    dayOrder: string; // You can use 'Date' here if needed
    totalQuantity: number;
    totalPrice: number;
    idCustomer: number;
    idEmployee: number;
    idCoupon: number | null;
}

// orderDetail model
export interface OrderDetail {
    idOrderDetail: number;
    idFood: number;
    quantity: number;
    price: number;
    idOrder: number;
}

// workSchedule model
export interface WorkSchedule {
    idWorkSchedule: number;
    workDate: number;
    breakDate: number | null;
    active: number;
    idEmployee: number;
}
