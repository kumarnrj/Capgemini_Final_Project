import { Address } from "./User";

export interface Orders{
    id:String,
    customerName:String,
    customerId:String,
    washerName:String,
    washerId:String,
    status:String,
    washingDate:String,
    washingType:String,
    time:String,
    paymentStatus:String;
    carBrand:String,
    carModal:String,
    carNumber:String,
    address:Address,
    phone:String

}