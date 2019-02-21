import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";
import { AuthService } from "./authservice";

@Injectable({ providedIn: "root" })

export class DashboardService {
    constructor(private http: Http) { }

    getPortfolio(userid) {
        const body = { 'id': userid };
        return this.http.post("http://localhost:3000/api/stocks/getportfolio", body);
    }

    getInfocus() {
        return this.http.get("http://localhost:3000/api/stocks/getinfocus");
    }
}