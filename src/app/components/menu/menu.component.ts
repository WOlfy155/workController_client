import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {SubSink} from "../../util/SubSink";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {switchMap, tap} from "rxjs";
import {UserWeb} from "../../models/user-web";
import {WorkRole} from "../../models/enums/work-role";

export interface MenuItem {
  icon: string,
  label: string,
  url: string,
  selected: boolean
}

export const menuItems: MenuItem[] = [
  {
    icon: 'home',
    label: ' Главная',
    url: 'master',
    selected: false
  },
  {
    icon: 'work',
    label: ' Мои проекты',
    url: 'projects',
    selected: false
  },
  {
    icon: 'signal_cellular_alt',
    label: ' Моя статистика',
    url: 'statistics',
    selected: false
  },
  {
    icon: 'receipt',
    label: ' Новости',
    url: 'news',
    selected: false
  },
  {
    icon: 'date_range',
    label: ' Календарь',
    url: 'calendar',
    selected: false
  },
  {
    icon: 'supervisor_account',
    label: 'Пользователи',
    url: 'user-list',
    selected: false
  }
]

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  isMenuClosed = false;

  private subs = new SubSink();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {

    this.subs.sink = this.menuService.menuClosed.pipe(
      tap(() => setTimeout(() => {}, 400)),
      tap(isMenuClosed => this.isMenuClosed = isMenuClosed),
      switchMap(() => this.loginService.authInfo$),
      tap(user => this.deleteUserListIfNeeded(user))
    ).subscribe();
    const url = this.router.url.split('/').pop();
    // @ts-ignore
    this.menuItems.find(item => item.url === url)?.selected = true;

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get menuItems(): MenuItem[] {
    return menuItems;
  }

  selectItem(menuItem: MenuItem) {
    this.menuItems.forEach(item => item.selected = false);
    menuItem.selected = true;
  }

  private deleteUserListIfNeeded(user: UserWeb) {
    if (user.role === WorkRole.MANAGER) {
      return;
    }
    this.deleteUserList();
  }

  private deleteUserList() {
    const userListIndex = this.menuItems.findIndex(x => x.url === 'user-list')
    if(userListIndex < 0){
      return;
    }
    this.menuItems.splice(userListIndex, 1);
  }
}
