import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {
  private nameSubs: Subscription;
  private loginSubs: Subscription;
  userData
  loggedIn: boolean;
  name: String;
  email: string;

  constructor(private authService : AuthService) {
  }

  ngOnInit() {

    this.loginSubs = this.authService.getAuthStatusListener().subscribe(
      loggedin => {
        this.loggedIn = loggedin;
      }
    );

    this.nameSubs = this.authService.getNameListener().subscribe(
      obsname => {
        this.name = obsname;
      });

      //this.authService.changeEmail("saxena20@purdue.edu", "hello123");
      this.authService.getInfo()
        .subscribe(data => {
            this.userData = JSON.parse(JSON.stringify(data));
            this.userData = JSON.parse(this.userData._body);
            this.email = this.userData.email;
            console.log(this.userData);
        });

  }

}
