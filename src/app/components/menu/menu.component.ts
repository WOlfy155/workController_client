import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {SubSink} from "../../util/SubSink";

export interface menuItem{
  icon: string,
  label: string
}

export const menuItems: menuItem[] = [
  {
    icon: 'home',
    label: ' Главная'
  },
  {
    icon: 'work',
    label: ' Мои проекты'
  },
  {
    icon: 'signal_cellular_alt',
    label: ' Моя статистика'
  },
  {
    icon: 'receipt',
    label: ' Новости'
  },
  {
    icon: 'date_range',
    label: ' Календарь'
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
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.subs.sink = this.menuService.menuClosed.subscribe(
      isMenuClosed => this.isMenuClosed = isMenuClosed
    )
  }

  ngOnDestroy() {
  }

  get menuItems(): menuItem[]{
    return menuItems;
  }

}
