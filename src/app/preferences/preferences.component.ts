import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { Subscription } from 'rxjs';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent implements OnInit {

  private nameSubs: Subscription;
  private loginSubs: Subscription;
  userData;
  loggedIn: boolean;
  name: String;
  email: string;
  emailResponse = false;
  emailFail = false;
  username: string;
  usernameResponse = false;
  usernameFail = false;
  passwordResponse = false;
  passwordFail = false;
  error;

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

  changeEmail(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.changeEmail(form.value.newemail, form.value.password)
      .subscribe(data => {
        this.emailResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.emailFail = !(JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }

  changeUsername(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.changeUsername(form.value.newusername, form.value.password)
      .subscribe(data => {
        this.usernameResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.usernameFail = !(JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }

  changePassword(form: NgForm) {
    if (form.invalid) {
      this.error = "Incorrect information, please re-enter";
      return;
    }
    if (form.value.newpassword !== form.value.newpassword2) {
      this.error = "Incorrect information, please re-enter";
      return;
    }
    this.error = "";
    this.authService.changePassword(form.value.oldpassword, form.value.newpassword)
      .subscribe(data => {
        this.passwordResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.passwordFail = !(JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }

}
