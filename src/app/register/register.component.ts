import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../authservice';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService) { }

  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (form.value.password !== form.value.password2) {
      return;
    }
    console.log(form.value);
    this.authService.createUser(form.value.name, form.value.email, form.value.password);
  }


  ngOnInit() {
  }

}
