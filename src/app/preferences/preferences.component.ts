import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
      console.log(this.authService.getUserId());
  }

}
