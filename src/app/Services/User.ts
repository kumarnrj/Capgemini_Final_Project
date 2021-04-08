export interface User{
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phone:String
    address:Address
  }
  
  export interface Address{
    pincode:String,
    city:String,
    state:String,
    street:String
  }