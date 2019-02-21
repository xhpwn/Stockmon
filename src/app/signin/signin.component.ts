import { Component, OnInit } from '@angular/core';
import { NgForm, SelectMultipleControlValueAccessor } from '@angular/forms';
import { AuthService } from '../authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  errorMessage: String;

  constructor(private router: Router, public authService : AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.signin(form.value.email, form.value.password);
    if (this.authService.getUserId() !== undefined) {
      this.router.navigate(["/loggedhome"]);
    } else {
      this.errorMessage = "Login Failed. Please try again.";
    }
  }

}
