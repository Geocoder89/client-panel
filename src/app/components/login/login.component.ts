import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
  };
  constructor(
    private authservice: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authservice.getAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }

  onSubmit() {
    // login method by calling auth service
    this.authservice
      .login(this.user.email, this.user.password)
      .then((response) => {
        // flash message
        this.flashMessages.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 4000,
        });
        // redirect to dashboard

        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.flashMessages.show(err.message, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
      });
  }
}
