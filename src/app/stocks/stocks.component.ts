import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.getStocks();
  }

}
