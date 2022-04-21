import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {LoginService} from "../../services/login.service";
import {SubSink} from "../../util/SubSink";
import {UserWeb} from "../../models/user-web";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  // @ts-ignore
  currentUser: UserWeb;

  private subs = new SubSink();

  constructor(
    private router: Router,
    private menuService: MenuService,
    private loginService: LoginService,
  ) { }

  ngOnInit(){
    this.subs.sink = this.loginService.authInfo$.subscribe(
      user => {
        console.dir(user);
        this.currentUser = user;
      }
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }

  logout() {
  this.subs.sink = this.loginService.logout().subscribe(
    () => {
      this.router.navigate(['/login']).then();
    }
  );
  }
}
