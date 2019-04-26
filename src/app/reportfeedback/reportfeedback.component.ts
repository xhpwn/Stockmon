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
  reportsArray;
  feedbackArray;
  isAdmin = false;
  currencyResponse;
  currencyFail;
  report: string;
  reportResponse;
  reportFail;
  feedback: string;
  feedbackResponse;
  feedbackFail;

  constructor(private authService : AuthService, private dashboardService: DashboardService) {
  }

  ngOnInit() {

    this.isAdmin = this.authService.isAdmin();
    console.log("ADMIN _" +  this.isAdmin);

    if (this.isAdmin) {

      this.authService.getReports().subscribe(result => {
        result = JSON.parse(JSON.stringify(result));
        result = JSON.parse(JSON.stringify(result["_body"]));
        this.reportsArray = JSON.parse(JSON.stringify(result));
        this.reportsArray = JSON.parse(this.reportsArray);

        console.log(this.reportsArray);
        // result.forEach(element => {
        //   console.log(element.name);
        // });
      });


      this.authService.getFeedback().subscribe(result => {
        result = JSON.parse(JSON.stringify(result));
        result = JSON.parse(JSON.stringify(result["_body"]));
        this.feedbackArray = JSON.parse(JSON.stringify(result));
        this.feedbackArray = JSON.parse(this.feedbackArray);
        console.log(this.feedbackArray);
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
        this.report = this.userData.report;
        this.defaultCurrency = (!this.userData.defaultCurrency) ? "None" : this.userData.defaultCurrency;

      });

    console.log(this.defaultCurrency);

  }


  submitReport() {
    this.authService.addToReports(this.report)
      .subscribe(data => {
        this.reportResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.reportFail = (JSON.parse(JSON.stringify(data)).statusText != "OK");
      });
  }

  viewReports() {
    this.authService.getReports().subscribe(result => {
      result = JSON.parse(JSON.stringify(result));
      result = JSON.parse(JSON.stringify(result["_body"]));
      this.reportsArray = JSON.parse(JSON.stringify(result));
      this.reportsArray = JSON.parse(this.reportsArray);
      console.log(this.reportsArray);
      // result.forEach(element => {
      //   console.log(element.name);
      // });
    })
  }

  submitFeedback() {
    this.authService.addToFeedback(this.feedback)
      .subscribe(data => {
        this.feedbackResponse = (JSON.parse(JSON.stringify(data)).statusText == "OK");
        this.feedbackFail = (JSON.parse(JSON.stringify(data)).statusText != "OK");
      });
  }

  viewFeedback() {
    this.authService.getFeedback().subscribe(result => {
      result = JSON.parse(JSON.stringify(result));
      result = JSON.parse(JSON.stringify(result["_body"]));
      this.feedbackArray = JSON.parse(JSON.stringify(result));
      this.feedbackArray = JSON.parse(this.feedbackArray);
      console.log(this.feedbackArray);
      // result.forEach(element => {
      //   console.log(element.name);
      // });
    })
  }

}
