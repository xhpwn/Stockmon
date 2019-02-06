import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })

export class StockService {

    constructor(private http: Http) {}

    getInfocus() {
        this.http.get("https://api.iextrading.com/1.0/stock/market/list/infocus")
        .subscribe(response => {
            console.log(response);
        })
    }

}