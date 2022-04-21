import {Injectable} from "@angular/core";
import {LoginController} from "../controller/LoginController";
import {LoginData} from "../pages/login/login.component";
import {BehaviorSubject, catchError, mapTo, Observable, of, switchMap, take, tap} from "rxjs";
import {Tokens} from "../models/tokens";
import {Router} from "@angular/router";
import {UserWeb} from "../models/user-web";
import {UserController} from "../controller/UserController";

@Injectable({providedIn: 'root'})
export class LoginService {

  // @ts-ignore
  private authInfo = new BehaviorSubject<UserWeb>(undefined);
  public authInfo$ = this.authInfo.asObservable();

  constructor(
    private readonly router: Router,
    private readonly userController: UserController,
    private readonly loginController: LoginController,
  ) {
  }

  login(loginData: LoginData): Observable<boolean> {
    return this.loginController.login(loginData).pipe(
      tap(tokens => this.doLogInUser(tokens)),
      switchMap(() => this.userController.loadCurrentUser()),
      tap(user => this.authInfo.next(user)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    )
  }

  logout(): Observable<void> {
    return this.loginController.logout().pipe(
      tap(() =>  this.doLogout())
    );
  }

  loadCurrentUser(){
    if(!this.isLoggedIn){
      return;
    }

    return this.userController.loadCurrentUser().pipe(
      take(1),
      tap(user => this.authInfo.next(user))
    );
  }

  doLogInUser(tokens: Tokens) {
    localStorage.setItem('token', tokens.access_token);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token == null) {
      return false;
    }
    return true;
  }


  private doLogout() {
    localStorage.removeItem('token');
  }
}

export function LoginServiceFactory(loginService: LoginService) {
  return () =>  loginService.loadCurrentUser();
}
