import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  user: User = {
    email: '',
    password: '',
  };
  constructor(
    private authservice: AuthService,
    private flashMessages: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // tslint:disable-next-line: typedef
  onSubmit() {
    this.authservice
      .register(this.user.email, this.user.password)
      .then((res) => {
        this.flashMessages.show('you are now registered and logged in', {
          cssClass: 'alert-success',
          timeout: 4000,
        });
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
