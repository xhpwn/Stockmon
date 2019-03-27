import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { CryptoService } from '../cryptoservice';

@Component({
  selector: 'app-crypto',
  templateUrl: './crypto.component.html',
  styleUrls: ['./crypto.component.css']
})
export class CryptoComponent implements OnInit {
  constructor(public cryptoService: CryptoService, private authService: AuthService) { }

  cryptoList;
  selected = false;
  numC;

  ngOnInit() {
    this.cryptoService.getCryptos()
      .subscribe(data => {
        this.cryptoList = data;
        this.cryptoList = JSON.parse(this.cryptoList._body);
        console.log(this.cryptoList);
      });
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

}
