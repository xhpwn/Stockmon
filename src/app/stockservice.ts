import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })

export class StockService {

    constructor(private http: Http) {}

    getInfocus() {
        this.http.get("http://localhost:3000/api/stocks/getinfocus")
        .subscribe(response => {
            console.log(response);
        })
    }

}