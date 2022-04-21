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
    if(!this.loginService.isLoggedIn){
      this.router.navigate(['/login']);
    }
    return this.loginService.isLoggedIn;
  }

}

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
  }

  canActivate(){
    if(!this.loginService.isLoggedIn){
      this.router.navigate(['/login']);
    }

    return this.loginService.isLoggedIn;
  }

}
