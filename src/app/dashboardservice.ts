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

    getCryptPortfolio(userid) {
        const body = { 'id': userid };
        return this.http.post("http://localhost:3000/api/stocks/getCryptPortfolio", body);
    }

    getCurrencyList() {
        return this.http.get("http://localhost:3000/api/user/getCurrencies");
    }

    changeDefaultCurrency(userid, newdefault: string) {
        let body = { 'userid': userid, 'newdefault': newdefault };
        console.log(body);
        return this.http.post("http://localhost:3000/api/user/changeDefaultCurrency", body);
    }

    convert(from, to) {
        let body = { 'from': from, 'to': to };
        return this.http.post("http://localhost:3000/api/user/convertCurrency", body);
    }

}