import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {SubSink} from "../../util/SubSink";
import {ActivatedRoute, Router} from "@angular/router";

export interface menuItem{
  icon: string,
  label: string,
  url: string,
  selected: boolean
}

export const menuItems: menuItem[] = [
  {
    icon: 'home',
    label: ' Главная',
    url: 'master',
    selected:false
  },
  {
    icon: 'work',
    label: ' Мои проекты',
    url: 'projects',
    selected:false
  },
  {
    icon: 'signal_cellular_alt',
    label: ' Моя статистика',
    url: 'statistics',
    selected:false
  },
  {
    icon: 'receipt',
    label: ' Новости',
    url: '',
    selected:false
  },
  {
    icon: 'date_range',
    label: ' Календарь',
    url: 'calendar',
    selected:false
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
  ) { }

  ngOnInit() {
    this.subs.sink = this.menuService.menuClosed.subscribe(
      isMenuClosed => this.isMenuClosed = isMenuClosed
    );
    const url = this.router.url.split('/').pop();
    // @ts-ignore
    this.menuItems.find(item => item.url === url)?.selected = true;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get menuItems(): menuItem[]{
    return menuItems;
  }

  selectItem(menuItem: menuItem) {
    this.menuItems.forEach(item => item.selected = false);
    menuItem.selected = true;
  }
}
