import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    let loggedin : boolean = true;
  }

}
