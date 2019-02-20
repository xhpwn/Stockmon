import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";
import { AuthService } from "./authservice";

@Injectable({ providedIn: "root" })

export class StockService {

  constructor(private http: Http) {}

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

  getChartData(symbol: string, timeFrame: string) {
    let query = "http://localhost:3000/api/stocks/getChartData?symbol=" + symbol + "&time=" + timeFrame;
    return this.http.get(query);
  }

  getFollowingList(userid) {
    const body = { 'id' : userid };
    return this.http.post("http://localhost:3000/api/stocks/getfollowing", body);
  }

  getNews() {
    return this.http.get("http://localhost:3000/api/stocks/getnews");
  }

}
