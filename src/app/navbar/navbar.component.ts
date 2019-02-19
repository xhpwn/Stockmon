import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authservice';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(
      loginStatus => {
        this.isLoggedIn = loginStatus;
      }
    );
  }

  ngOnDestroy() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/home"]);
  }

}
