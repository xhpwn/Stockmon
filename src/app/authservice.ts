import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthData } from './auth-data.model';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class AuthService {

  private token: string;
  private name: string;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  private nameListener = new BehaviorSubject<String>(this.getName());
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());

  getAuthStatusListener() {
    return this.isLoginSubject.asObservable();
  }

  getNameListener() {
    return this.nameListener.asObservable();
  }

  getToken() {
    return localStorage.token;
  }

  hasToken() {
    if (localStorage.getItem('token') !== undefined) {
      return true;
    }
    return false;
  }

  getName() {
    return localStorage.getItem('name');
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  constructor(private http: Http) {}

  createUser(name: string, email: string, username: string, password: string) {
    const authData: AuthData = { name: name, email: email, username: username, password: password };
    console.log(authData);
    return this.http.post('http://localhost:3000/api/user/register', authData);
  }

  signin(email: string, username: string, password: string) {
    const authData: AuthData = { name: 'Doesn\'t matter', email: email, username: username, password: password};
    this.http.post('http://localhost:3000/api/user/signin', authData)
      .subscribe(response => {
        const data = JSON.stringify(response);
        console.log(response);
        this.isLoginSubject.next(true);
        if (response.status === 200) {
          this.name = (JSON.parse(JSON.parse(data)._body)).name;
          this.token = (JSON.parse(JSON.parse(data)._body)).token;
          this.userId = (JSON.parse(JSON.parse(data)._body)).userId;
          localStorage.setItem('token', this.token);
          localStorage.setItem('name', this.name);
          localStorage.setItem('userId', this.userId);
          this.nameListener.next(this.name);
        }
      });
  }

  changeEmail(newEmail: string, password: string) {
    const temp = this.getUserId();
    const body = { userid: temp, email: newEmail, password: password };
    console.log(body);
    this.http.post('http://localhost:3000/api/user/updateemail', body)
      .subscribe(response => {
        console.log(response);
      });
    return this.http.post('http://localhost:3000/api/user/updateemail', body);
  }

  changeUsername(newUsername: string, password: string) {
    const temp = this.getUserId();
    const body = { userid: temp, username: newUsername, password: password };
    console.log(body);
    this.http.post('http://localhost:3000/api/user/updateusername', body)
      .subscribe(response => {
        console.log(response);
      });
    return this.http.post('http://localhost:3000/api/user/updateusername', body);
  }

  changePassword(oldPassword: string, newPassword: string) {
    const body = { 'userid': localStorage.getItem('userId'), 'oldPassword': oldPassword, 'newPassword': newPassword };
    return this.http.post('http://localhost:3000/api/user/updatepassword', body);
  }

  getInfo() {
    const temp = this.getUserId();
    const body = { userid: temp };
    return this.http.post('http://localhost:3000/api/user/getinfo', body);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
    this.name = undefined;
    this.token = undefined;
    this.userId = undefined;
    this.isLoginSubject.next(false);
  }

  getUsers() {
    const temp = this.getUserId();
    const body = { userid: temp };
    return this.http.post('http://localhost:3000/api/user/getUsers', body);
  }

  isAdmin() {
    if (this.getName() == 'Mr. Root') return true;
    return false;
  }

  deleteAccount(target: string) {
    if (!this.isAdmin()) return
    let body = { userId: this.getUserId(), targetUserEmail: target }
    return this.http.post('http://localhost:3000/api/user/deleteuser', body);
  }

}
