import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";
import { AuthService } from "./authservice";

@Injectable({ providedIn: "root" })

export class StockService {

  constructor(private http: Http) {
  }

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
    const body = {'id': userid};
    return this.http.post("http://localhost:3000/api/stocks/getfollowing", body);
  }

  getDescription(symbol: string) {
    return this.http.get("http://localhost:3000/api/stocks/getdescription?symbol=" + symbol);
  }

  getPrice(symbol: string) {
    let query = "http://localhost:3000/api/stocks/getPrice?symbol=" + symbol;
    return this.http.get(query);
  }

  addToFollowingList(sym: string) {
    let body = { "symbol" : sym, "id" : localStorage.getItem("userId") }
    let query = "http://localhost:3000/api/stocks/addFollowingStock";
    console.log(body);
    return this.http.post(query, body);
  }

  addToPortfolioList(sym: string, shares: number) {
    let body = { "symbol" : sym, "id" : localStorage.getItem("userId"), "shares": shares }
    let query = "http://localhost:3000/api/stocks/addportfolio";
    console.log(body);
    return this.http.post(query, body);
  }

  removeFromFollowingList(sym: string) {
    let body = { "symbol" : sym, "id" : localStorage.getItem("userId") }
    let query = "http://localhost:3000/api/stocks/removeFollowingStock";
    console.log(body);
    return this.http.post(query, body);
  }

  getLogo(sym: string) {
    return this.http.get("http://localhost:3000/api/stocks/getLogo?symbol=" + sym);
  }

  searchBySymbol(sym: string) {
    return this.http.get("http://localhost:3000/api/stocks/search?symbol=" + sym);
  }

  searchBySymbolTest(sym: string) {
    return 'AAPL';
    this.http.get("http://localhost:3000/api/stocks/search?symbol=" + sym).subscribe(
      res => {
        res = JSON.parse(JSON.stringify(res));
        return res["body"]["symbol"].toString();
      }
    );
  }

  updatePortfolio(sym: string, shares) {
    let body = { "symbol" : sym, "id" : localStorage.getItem("userId"), "shares": shares }
    let query = "http://localhost:3000/api/stocks/updatePortfolio";
    return this.http.post(query, body);
  }

  removePortfolio(sym: string) {
    let body = { "id": localStorage.getItem("userId"), "symbol": sym };
    return this.http.post("http://localhost:3000/api/stocks/removeportfolio", body);
  }

}
