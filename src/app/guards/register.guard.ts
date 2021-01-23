import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SettingsService } from '../services/settings.service';
@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private settings: SettingsService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if it is true it will show route to show registration
    if (this.settings.getSettings().allowRegistration) {
      return true;
    } else {
      // else it will take you to login
      this.router.navigate(['/login']);
    }
  }
}
