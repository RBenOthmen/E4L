import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:4200"

  constructor(private httpClient: HttpClient) {

  }

  postUser(user:User): Observable<User> {
    return this.httpClient.post<User>(this.url, user);
  }
}
