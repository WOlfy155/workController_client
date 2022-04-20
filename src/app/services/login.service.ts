import {Injectable} from "@angular/core";
import {LoginController} from "../controller/LoginController";
import {LoginData} from "../pages/login/login.component";
import {catchError, mapTo, Observable, of, tap} from "rxjs";
import {Tokens} from "../models/tokens";

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(
    private readonly loginController: LoginController
  ) {
  }

  login(loginData: LoginData): Observable<boolean> {

    return this.loginController.login(loginData).pipe(
      tap(tokens => this.doLogInUser(tokens)),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      })
    )
  }

  doLogInUser(tokens: Tokens) {
    localStorage.setItem('token', tokens.access_token);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token')
    if (!token) {
      return false;
    }
    return true;
  }


}
