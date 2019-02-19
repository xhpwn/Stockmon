import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })

export class AuthService {

    private token: string;
    private name: string;
    private userId: string;
    private authStatusListener = new Subject<boolean>();

    getAuthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    getToken() {
        return localStorage.token;
    }

    getName() {
        return localStorage.name;
    }

    getUserId() {
        return localStorage.userId;
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
        const authData: AuthData = { name: 'Test user', email: email, password: password };
        this.http.post("http://localhost:3000/api/user/signin", authData)
            .subscribe(response => {
                let data = JSON.stringify(response);
                console.log(response);
                this.authStatusListener.next(true);
                if (response.status == 200) {
                    this.name = (JSON.parse(JSON.parse(data)._body)).name;
                    this.token = (JSON.parse(JSON.parse(data)._body)).token;
                    this.userId = (JSON.parse(JSON.parse(data)._body)).userId;
                    localStorage.token = this.token;
                    localStorage.userId = this.userId;
                    localStorage.name = this.name;
                }
            });
    }

    logout() {
        localStorage.name = "";
        localStorage.token = "";
        localStorage.userId = "";
        this.name = "";
        this.token = "";
        this.userId = "";
        this.authStatusListener.next(false);
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