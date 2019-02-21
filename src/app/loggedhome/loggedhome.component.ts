import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-loggedhome',
  templateUrl: './loggedhome.component.html',
  styleUrls: ['./loggedhome.component.css']
})
export class LoggedhomeComponent implements OnInit {

  private nameSubs: Subscription;
  name: String;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.nameSubs = this.authService.getNameListener().subscribe(
      obsname => {
        this.name = obsname;
      });

  }

}
