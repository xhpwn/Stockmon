import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";
import { AuthService } from "./authservice";

@Injectable({ providedIn: "root" })

export class CryptoService {

    constructor(private http: Http) {
    }

    getCryptos() {
        return this.http.get("http://localhost:3000/api/stocks/getCryptocurrencies");
    }
}