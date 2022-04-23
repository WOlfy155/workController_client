import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../../../services/login.service";
import {SubSink} from "../../../util/SubSink";
import {UserWeb} from "../../../models/user-web";
import {switchMap, tap} from "rxjs";
import {UserInfo} from "../../../models/user-info";
import {UserController} from "../../../controller/UserController";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  currentUser: UserWeb | undefined;
  userInfo : UserInfo | undefined;

  constructor(
    private loginService: LoginService,
    private userController: UserController
  ) {
  }

  ngOnInit() {
    this.subs.sink = this.loginService.authInfo$.pipe(
      tap(user => this.currentUser = user),
      switchMap(user => this.userController.loadUserInfo(user.id)),
      tap(userInfo => this.userInfo = userInfo)
    ).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get role(): string {
    if (!this.currentUser) {
      return ''
    }

    if (!this.currentUser.role) {
      return ''
    }
    return this.currentUser.role.toString();
  }
}


