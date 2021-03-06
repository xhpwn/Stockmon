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
  newCRYPTOData = new Array();
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
  iscrypto = false;
  sempleData = new Array();

  constructor(public stockService: StockService, public cryptoService: CryptoService) {    
  }

  ngOnInit() {
    
    if (this.stock != undefined) {

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
  }


  else {
    //this.sempleData = {"label":1553803200,"value":138},{"label":1553806800,"value":138.17},{"label":1553810400,"value":138.15},{"label":1553814000,"value":138.39},{"label":1553817600,"value":138.57},{"label":1553821200,"value":138.79};

    console.log(this.cryptotime);
    if (!this.cryptotime) {
      this.cryptotime = "histominute";
    }
    console.log(this.crypto);
    
    this.cryptoService.getCryptodata(this.crypto["Symbol"].toString(), this.cryptotime)
    .subscribe(data => {
      this.iscrypto = true;
      this.test = data;
      this.test = JSON.parse(this.test._body);
 
     this.test.forEach(element => {
       let temp = {
         "label": element.label, "value": element.value.toString()
       }
       this.newCRYPTOData.push(temp)
       console.log(this.newCRYPTOData);
      })});
      this.iscrypto = true;
    }
    
  


if (this.stock != undefined) {
   this.stockService.getChartData(this.stock["symbol"].toString(), this.time)
   .subscribe(data => {
     this.test = data;
     this.test = JSON.parse(this.test._body);

     this.test.forEach(element => {
      let temp = {
        "label": element.label, "value": element.value.toString()
      }

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
  }
  else {
    this.iscrypto = true;
  }

   setTimeout(() => this.loadData(), 500);
}



  loadData() {
if(this.iscrypto == true){
  this.dataSource = {
    chart: {
      "caption": "Crypto data for " + this.crypto["Symbol"],
      "subCaption":  this.cryptotime,
      "xAxisName": "Time",
      "yAxisName": "$(USD)",
      "lineColor": "#346474",
      "bgcolor": "white",
      "showAlternateHGridColor": 0,
      "numberPrefix": "$",
      "theme": "gammel"
    },

    //Chart data
    "data": this.newCRYPTOData
}
}

else{

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
   
  };}
  console.log(this.dataSource);
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
