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

    addToPortfolio(userId, crypto, number) {
        const body = { 'id': userId, 'symbol': crypto["Symbol"], 'numCrypto': number };
        console.log(body);
        return this.http.post("http://localhost:3000/api/stocks/addCryptPortfolio", body );
    }

    removeFromPortfolio(userId, crypto) {
        const body = { 'id': userId, 'symbol': crypto["symbol"] };
        console.log(body);
        return this.http.post("http://localhost:3000/api/stocks/removeCryptPortfolio", body );
    }

    updatePortfolio(userId, crypto, number) {
        console.log(number);
        const body = { 'id': userId, 'symbol': crypto["symbol"], 'numCrypto': number };
        console.log(body);
        return this.http.post("http://localhost:3000/api/stocks/updateCryptoNum", body );
    }

}