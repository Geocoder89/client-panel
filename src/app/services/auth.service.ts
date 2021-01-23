import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularfireauth: AngularFireAuth) {}

  // tslint:disable-next-line: typedef
  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularfireauth.auth
        .signInWithEmailAndPassword(email, password)
        .then(
          (userData) => {
            resolve(userData);
          },
          (err) => reject(err)
        );
    });
  }

  // service to check if we are logged in

  getAuth() {
    return this.angularfireauth.authState.map((auth) => auth);
  }

  // logout service
  logout() {
    this.angularfireauth.auth.signOut();
  }

  // register service
  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.angularfireauth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(
          (userData) => {
            resolve(userData);
          },
          (err) => reject(err)
        );
    });
  }
}
