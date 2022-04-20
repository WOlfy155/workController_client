import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {LoginService} from "../../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, CanLoad {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  canActivate(){
    if(this.loginService.isLoggedIn){
      this.router.navigate(['/main']);
    }

    return !this.loginService.isLoggedIn;
  }

  canLoad() {
    return this.loginService.isLoggedIn;
  }

}
