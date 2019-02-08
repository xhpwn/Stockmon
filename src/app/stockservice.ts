import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })

export class StockService {

    constructor(private http: Http) {}

    getInfocus() {
        return this.http.get("http://localhost:3000/api/stocks/getinfocus");
    }

}