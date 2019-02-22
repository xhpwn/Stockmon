import { Component, OnInit } from '@angular/core';
import { NgForm, SelectMultipleControlValueAccessor } from '@angular/forms';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginListener: Subscription;
  loggedin = false;
  errorMessage: String;

  constructor(private router: Router, public authService : AuthService) { }

  ngOnInit() {
    this.loginListener = this.authService.getAuthStatusListener()
      .subscribe( res => {
        this.loggedin = res;
      });
  }

  onLogin(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.authService.signin(form.value.email, form.value.password);
    setTimeout(() => this.loginRedirect(), 500);
  }

  loginRedirect() {
    console.log(this.loggedin);
    if (this.loggedin) {
      this.router.navigate(["/loggedhome"]);
    }
      this.errorMessage = "Login Failed. Please try again.";
    }

}
