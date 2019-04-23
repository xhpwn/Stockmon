import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { Subscription } from 'rxjs';
import { Form, NgForm } from '@angular/forms';
import { DashboardService } from '../dashboardservice';

@Component({
  selector: 'app-preferences',
  templateUrl: './reportfeedback.component.html',
  styleUrls: ['./reportfeedback.component.css']
})
export class ReportFeedbackComponent implements OnInit {

  private nameSubs: Subscription;
  private loginSubs: Subscription;
  userData;
  loggedIn: boolean;
  name: String;
  email: string;
  emailResponse = false;
  defaultCurrency;
  emailFail = false;
  username: string;
  currencyList;
  usernameResponse = false;
  usernameFail = false;
  passwordResponse = false;
  passwordFail = false;
  error;
  array;
  isAdmin = false;
  currencyResponse;
  currencyFail;

  constructor(private authService : AuthService, private dashboardService: DashboardService) {
  }

  ngOnInit() {

    this.dashboardService.getCurrencyList().subscribe(
      response => {
        response = JSON.parse(response["_body"]);
        //response = JSON.parse(response["data"]);
        console.log(response);
        this.currencyList = Object.keys(response);
      }
    );

    this.isAdmin = this.authService.isAdmin();
    console.log("ADMIN _" +  this.isAdmin);

    if (this.isAdmin) {

    this.authService.getUsers().subscribe(result => {
      result = JSON.parse(JSON.stringify(result));
      result = JSON.parse(JSON.stringify(result["_body"]));
      this.array = JSON.parse(JSON.stringify(result));
      this.array = JSON.parse(this.array);
      console.log(this.array);
      // result.forEach(element => {
      //   console.log(element.name);
      // });
    })
    }

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
        console.log(this.userData);
        this.email = this.userData.email;
        this.defaultCurrency = (!this.userData.defaultCurrency) ? "None" : this.userData.defaultCurrency;
        
      });

      console.log(this.defaultCurrency);

  }

  changeCurrency(form: NgForm) {
    this.dashboardService.changeDefaultCurrency(this.authService.getUserId(), form.value.selectedcurr)
    .subscribe(data => {
      console.log(JSON.parse(JSON.stringify(data)))
      this.currencyResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
      this.currencyFail = !(JSON.parse(JSON.stringify(data)).statusText == "OK");
    });
    console.log("Changed")
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

  submitReport(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.changeEmail(form.value.newemail, form.value.password)
      .subscribe(data => {
        this.emailResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.emailFail = !(JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }

  submitFeedback(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.changeEmail(form.value.newemail, form.value.password)
      .subscribe(data => {
        this.emailResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.emailFail = !(JSON.parse(JSON.stringify(data)).statusText == "OK");
      });
  }

}
