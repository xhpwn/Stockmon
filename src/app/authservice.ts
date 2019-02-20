import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";
import { Subject, BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })

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
        if (localStorage.getItem("token") != undefined)
            return true;
        return false;
    }

    getName() {
        return localStorage.getItem("name");
    }

    getUserId() {
        return localStorage.getItem("userId");
    }

    constructor(private http: Http) {}

    createUser(name: string, email: string, password: string) {
        const authData: AuthData = { name: name, email: email, password: password };
        console.log(authData);
        this.http.post("http://localhost:3000/api/user/register", authData)
            .subscribe(response => {
                console.log(response);
            })
    }

    signin(email: string, password: string) {
        const authData: AuthData = { name: "Doesn't matter", email: email, password: password };
        this.http.post("http://localhost:3000/api/user/signin", authData)
            .subscribe(response => {
                let data = JSON.stringify(response);
                console.log(response);
                this.isLoginSubject.next(true);
                if (response.status == 200) {
                    this.name = (JSON.parse(JSON.parse(data)._body)).name;
                    this.token = (JSON.parse(JSON.parse(data)._body)).token;
                    this.userId = (JSON.parse(JSON.parse(data)._body)).userId;
                    localStorage.setItem("token", this.token);
                    localStorage.setItem("name", this.name);
                    localStorage.setItem("userId", this.userId);
                    this.nameListener.next(this.name);
                }
            });
    }

    changeEmail(newEmail: string, password: string) {
        let temp = this.getUserId();
        let body = { userid: temp, email: newEmail, password: password };
        this.http.post("http://localhost:3000/api/user/updateemail", body)
            .subscribe(response => {
                console.log(response);
            });
    }
    
    getInfo() {
        let temp = this.getUserId();
        let body = { userid: temp };
        return this.http.post("http://localhost:3000/api/user/getinfo", body);
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("userId");
        this.name = undefined;
        this.token = undefined;
        this.userId = undefined;
        this.isLoginSubject.next(false);
    }

/*
    getUserInfo(userId) {
        const authData: AuthData = { name: 'Test user', email: email, password: password };
        this.http.post("http://localhost:3000/api/user/signin", authData)
            .subscribe(response => {
                let data = JSON.stringify(response);
                console.log(response);
                this.name = (JSON.parse(JSON.parse(data)._body)).name;
            });
    }
*/
}