import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {SubSink} from "../../util/SubSink";
import {Router} from "@angular/router";
import {filter, tap} from 'rxjs';

export interface LoginData{
  username: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  loginData: LoginData = {username : '', password: ''};

  showPassword: "text" | "password" = "password";

  private subs = new SubSink();

  constructor(
    private readonly loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  login() {
    this.subs.sink = this.loginService.login(this.loginData).pipe(
      tap(x => console.dir(x)),
      filter(loggedIn => loggedIn),
      tap(() => console.log("NpioXQtzhu :: должен навигейт делатт ежже")),
      tap(() => this.router.navigate(["/main"]))
    ).subscribe()
  }

  toggleShowPassword() {
    if(this.showPassword === "text"){
      this.showPassword = "password"
      return;
    }

    if(this.showPassword === "password"){
      this.showPassword = "text"
      return;
    }
  }
}
