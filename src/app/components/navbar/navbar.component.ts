import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/User';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private flashmessages: FlashMessagesService,
    private settings: SettingsService
  ) {}

  ngOnInit(): void {
    this.authservice.getAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settings.getSettings().allowRegistration;
  }

  onLogOut() {
    // call service to logout
    this.authservice.logout();

    // flash a message

    this.flashmessages.show('you are now logged out of the client panel', {
      cssClass: 'alert-success',
      timeout: 4000,
    });

    // navigate to login route

    this.router.navigate(['/login']);
  }
}
