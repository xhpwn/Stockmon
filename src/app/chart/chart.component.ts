import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../stockservice';
import {CryptoService} from '../cryptoservice';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})

export class ChartComponent implements OnInit {
  @Input() stock: Object;
  @Input() time: string;
  @Input() isWeek: boolean;

  @Input() crypto: Object;
  @Input() cryptotime: string;

  portfolioFail = false;
  dataSource;
  test;
  newData = new Array();
  counter = 0;
  price;
  selected = false;
  shares;
  followingResponse = false;
  portfolioResponse = false;
  exchange;
  description;
  logoUrl;
  weekData = new Array();

  constructor(public stockService: StockService, public cryptoService: CryptoService) {    
  }

  ngOnInit() {

    this.stockService.getDescription(this.stock["symbol"])
      .subscribe(data => {
        this.description = data;
      this.description = JSON.parse(this.description._body);
      this.description = this.description.description;
      })

      this.stockService.getDescription(this.stock["symbol"])
      .subscribe(data => {
        this.exchange = data;
      this.exchange = JSON.parse(this.exchange._body);
      this.exchange = this.exchange.exchange;
      })

      this.stockService.getLogo(this.stock["symbol"])
      .subscribe(data => {
        this.logoUrl = data;
      this.logoUrl = JSON.parse(this.logoUrl._body);
      this.logoUrl = this.logoUrl.url;
      })

    this.stockService.getPrice(this.stock["symbol"])
    .subscribe(data => {
      this.price = data;
      this.price = JSON.parse(this.price._body);
    })

    
    this.cryptoService.getCryptodata(this.crypto["symbol"].toString(), this.cryptotime)
    .subscribe(data => {
      this.test = data;
      this.test = JSON.parse(this.test._body);
 
     this.test.forEach(element => {
       let temp = {
         "label": element.label, "value": element.value.toString()
       }
       this.newData.push(temp)
      })});
  



   this.stockService.getChartData(this.stock["symbol"].toString(), this.time)
   .subscribe(data => {
     this.test = data;
     this.test = JSON.parse(this.test._body);

     this.test.forEach(element => {
      let temp = {
        "label": element.label, "value": element.value.toString()
      }
/*
      if(this.time == "1d"){
      //  if(this.counter % 2 ==0 ){         // <------------------------ LIVE goes to end
          this.newData.push(this.price)
       // }
        this.counter++;
      }
*/
      if(this.time == "1m"){
        if(this.counter % 2 ==0 ){         // <------------------------ Change 1m skips
          this.newData.push(temp)
        }
        this.counter++;
      }

      if(this.time == "1y"){
      if(this.counter % 23 ==0 ){         // <------------------------ Change 1y skips
        this.newData.push(temp)
      }
      this.counter++;
    }


    if(this.time == "5y"){
      if(this.counter % 75 ==0 ){        // <------------------------ Change 5y skips
        this.newData.push(temp)
      }
      this.counter++;
    }

   
    
    });
    if (this.isWeek) {
      this.weekData = this.newData.slice(this.newData.length - 7, this.newData.length);
      console.log("EEEEEEENEW");
      console.log(this.weekData);
    }
   });

   setTimeout(() => this.loadData(), 500);

   
}

  loadData() {
    this.dataSource = {
      chart: {
        "caption": "Stock data for " +this.stock["symbol"].toString(),
        "subCaption": this.isWeek ? "1w" : this.time,
        "xAxisName": "Time",
        "yAxisName": "$(USD)",
        "lineColor": "#346474",
        "bgcolor": "white",
        "showAlternateHGridColor": 0,
        "numberPrefix": "$",
        "theme": "gammel"
      },
      // Chart Data
      "data": this.isWeek ? this.weekData : this.newData
   
  };
  }

  addToFollowing() {
    console.log(this.stock["symbol"])
    this.stockService.addToFollowingList(this.stock["symbol"])
      .subscribe(data => {
        this.followingResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }

  addToPortfolio() {
    console.log(this.stock["symbol"])
    this.stockService.addToPortfolioList(this.stock["symbol"], this.shares)
      .subscribe(data => {
        this.portfolioResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.portfolioFail = (JSON.parse(JSON.stringify(data)).statusText != "OK");
      });
  }

  onSelected() {
    this.selected = true;
  }

}
