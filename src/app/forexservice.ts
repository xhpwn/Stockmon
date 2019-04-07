import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthData } from "./auth-data.model";
import { AuthService } from "./authservice";

@Injectable({ providedIn: "root" })

export class ForexService {

  constructor(private http: Http) {
  }


  getForexdata() {
    let query = "http://localhost:3000/api/stocks/getforexdata";
    console.log(query);
    return this.http.get(query);
  }
}