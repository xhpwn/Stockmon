import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ListviewComponent } from '../listview/listview.component';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name: string;

  constructor(private authService : AuthService) {
    let loggedin : boolean = true;
    let data : String[] = ['Apple', 'Microsoft'];
   }

  ngOnInit() {
    setTimeout(() => console.log('Nav-ed'), 1000);
    this.name = this.authService.getName();
    console.log(this.name);
    this.name = this.name.substr(0, this.name.indexOf(' '));
  }

}

