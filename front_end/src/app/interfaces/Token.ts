import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();
const token = 'token'
const decodedToken = helper.decodeToken(token);
const expirationDate = helper.getTokenExpirationDate(token);
const isExpired = helper.isTokenExpired(token);


export class Token {
    refresh?: string;
    access?:string;


}


