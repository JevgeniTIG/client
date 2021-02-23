import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {conf} from '../config/conf';

const USER_API = conf.host + '/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<any>{
    return this.http.get(USER_API + id);
  }

  getCurrentUser(): Observable<any>{
    return this.http.get(USER_API);
  }

  updateUser(user: any): Observable<any>{
    return this.http.post(USER_API + 'update', user);
  }
}
