import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { DashboardService } from '../dashboardservice';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {

  constructor(private authService: AuthService, private dashboardService: DashboardService) { }

  loaded = 0;

  userData;
  defaultCurrency;
  currencySymbols;
  currencyNames;

  selectedSymbol;
  oldSymbol;
  selectedName;
  oldName;

  fromCurr;
  toCurr;
  answerString;
  ansobj;
  converted;
  format;
  readyy;
  reciprocal;

  n =  new Date();
  dayofWeek = this.n.getDay(); // 0 -6 0 = SUnday 1 = Monday 2 = Tuesday...
  hourofDay = this.n.getHours(); // 24 hour format
  marketStatus = "open";

  ngOnInit() {

    console.log(this.dayofWeek);
    if((this.dayofWeek == 0 && this.hourofDay < 17) || (this.dayofWeek == 5 && this.hourofDay >= 16) || (this.dayofWeek == 6)){
      this.marketStatus == "closed";
    }
  

    this.authService.getInfo()
      .subscribe(data => {
        this.userData = JSON.parse(JSON.stringify(data));
        this.userData = JSON.parse(this.userData._body);
        console.log(this.userData);
        this.defaultCurrency = (!this.userData.defaultCurrency) ? "None" : this.userData.defaultCurrency;
      }, (err) => console.error(err),
      () => this.ready());
      this.dashboardService.getCurrencyList().subscribe(
        response => {
          response = JSON.parse(response["_body"]);
          this.currencySymbols = Object.keys(response);
          this.currencyNames = Object.values(response);
        }
      );
  }

  onClickSubmit(data) {

this.format = (data.toCurr).toUpperCase() + "_" + (data.fromCurr).toUpperCase(); 

this.dashboardService.convert((data.fromCurr).toUpperCase(), (data.toCurr).toUpperCase()).subscribe(
    res => {
    this.converted = JSON.parse(JSON.stringify(res["_body"]));
    this.converted = JSON.parse(this.converted);
    this.converted = this.converted[this.format].val;

    this.reciprocal =(Math.round((1.0 / this.converted) * 100) / 100);
    this.answerString = "1 " + (data.fromCurr).toUpperCase() + " = " + this.reciprocal+ (data.toCurr).toUpperCase();

  }, (err) => console.log(err),
  () => { this.readyy = true})

  }

  ready() {
    this.loaded += 1;
  }

  onSelect(Symbol: string, name: string): void {

    if (this.selectedSymbol != null) {
      this.oldSymbol = Symbol;
      this.oldName = name;
      this.selectedSymbol = null;
      this.selectedName = null;
    }
    else {
      this.selectedSymbol = Symbol;
      this.selectedName = name;
      this.oldName = null;
      this.oldSymbol = null;
    }
  }

}
