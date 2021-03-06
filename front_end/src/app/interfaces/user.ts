// export interface User {
//   id ?: number,
//   user_id ? : number,
//   first_name ?: string,
//   last_name ?:string,
//   password ?: string,
//   username ?: string,
//   email ?: string,
//   refresh ?: string,
//   token ?:string,
//     access ?:string
//     phone ? : string,
//     birth_date? : Date,
//     type ? : string,
//     role ?: string
// }
import { Phone } from "./Phone"; 

export class User {
  id ?: number;
  user_id ? : number;
  first_name ?: string;
  last_name ?:string;
  password ?: string;
  username ?: string;
  email ?: string;
  refresh ?: string;
  token ?:string;
    access ?:string
    // phone ? : string;
    phone ?: Phone;
    birth_date? : Date;
    type ? : string;
    role ?: string;
    user ?: User; 
    is_active ?: boolean;
  image ?: any;
  phone_id ?: number;
}
