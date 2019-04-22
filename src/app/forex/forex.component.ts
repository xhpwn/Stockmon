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

  ngOnInit() {
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
