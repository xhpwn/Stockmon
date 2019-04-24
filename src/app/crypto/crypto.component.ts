import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { CryptoService } from '../cryptoservice';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {
  constructor(public cryptoService: CryptoService, private authService: AuthService) { }

  selectedCrypto: Object;
  oldCrypto: Object;
  cryptoList;
  dataSource: Object;
  selected = false;
  numC;
  time: string;

  ngOnInit() {
    this.cryptoService.getCryptos()
      .subscribe(data => {
        this.cryptoList = data;
        this.cryptoList = JSON.parse(this.cryptoList._body);
        console.log(this.cryptoList);
      });
  }


  onSelect(crypto: Object):void {
    if(this.selectedCrypto != null){
      this.oldCrypto = crypto;
      this.selectedCrypto = null;
    }
    else{
     this.selectedCrypto = crypto;
     this.oldCrypto = null;
    }
   
    
 }
 
 setTime(time:string) {
   this.time = time;
 }

  onSelected() {
    this.selected = true;
  }

  addCryptoToPortfolio(crypto: Object) {
    this.cryptoService.addToPortfolio(this.authService.getUserId(), crypto, this.numC)
    .subscribe(result => {
      console.log(result);
    })
  }

  search(ngform: NgForm) {
    this.cryptoService.getCryptos()
      .subscribe(data => {
        this.cryptoList = data;
        this.cryptoList = JSON.parse(this.cryptoList._body);
        console.log(this.cryptoList);
      }, (err) => console.log(err), 
      () => {console.log(ngform.value.searchText);
        let newList = Array();
        console.log(this.cryptoList);
        this.cryptoList.forEach(element => {
          if (element.Symbol.includes(ngform.value.searchText))
            newList.push(element);
        });
        this.cryptoList = newList;});
  }

}
