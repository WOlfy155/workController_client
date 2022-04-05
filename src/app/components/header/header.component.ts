import { Component, OnInit } from '@angular/core';
import {MenuService} from "../../services/menu.service";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private menuService: MenuService,
  ) { }

  ngOnInit(): void {
  }

  toggleMenu() {
    this.menuService.toggleMenu();
  }
}