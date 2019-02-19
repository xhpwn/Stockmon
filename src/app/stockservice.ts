import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })

export class StockService {

  constructor(private http: Http) { }

  getInfocus() {
    return this.http.get("http://localhost:3000/api/stocks/getinfocus");
  }

  getGainers() {
    return this.http.get("http://localhost:3000/api/stocks/getgainers");
  }

  getLosers() {
    return this.http.get("http://localhost:3000/api/stocks/getlosers");
  }

  getTest() {
    return this.http.get("http://localhost:3000/api/stocks/test");
  }

  getLogo(company: string) {
    return this.http.get("http://localhost:3000/api/stocks/getlogo?company=" + company);
  }

  getChartData(symbol: string, timeFrame: string) {
    let query = "http://localhost:3000/api/stocks/getChartData?symbol=" + symbol + "&time=" + timeFrame;
    return this.http.get(query);
  }

}
