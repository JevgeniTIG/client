import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {conf} from '../config/conf';

const AUTH_API = conf.host + '/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login(user): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      userName: user.userName,
      password: user.password
    });
  }

  public register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email: user.email,
      phone: user.phone,
      userName: user.userName,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      confirmPassword: user.confirmPassword
    });
  }
}
