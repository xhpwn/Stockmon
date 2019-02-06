import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })

export class AuthService {

    constructor(private http: Http) {

    }

    createUser(name: string, email: string, password: string) {
        const authData: AuthData = { name: name, email: email, password: password };
        console.log(authData);
        this.http.post("http://localhost:3000/api/user/register", authData)
            .subscribe(response => {
                console.log(response);
            })
    }
}