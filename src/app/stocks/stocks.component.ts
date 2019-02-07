import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { StockService } from '../stockservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  inFocus;

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockService.getInfocus()
      .subscribe(data => {
        this.inFocus = data
        this.inFocus = JSON.parse(this.inFocus._body);
        console.log(this.inFocus[0]);
    });
  }

}
