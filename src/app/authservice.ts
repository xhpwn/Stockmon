import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })

export class AuthService {

    token: string;
    name: string;
    userId: string;

    getToken() {
        return this.token;
    }

    getName() {
        return this.name;
    }

    getUserId() {
        return sessionStorage.userId;
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
                this.name = (JSON.parse(JSON.parse(data)._body)).name;
                this.userId = (JSON.parse(JSON.parse(data)._body)).userId;
                sessionStorage.userId = this.userId;
            });
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