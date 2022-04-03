import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyController} from "../services/controller/MyController";
import {SubSink} from "./util/SubSink";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {MenuService} from "./services/menu.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'workController_client';
  subs = new SubSink();
  numbers: string[] = [];
  menuIsClosed = false;

  constructor(
    private readonly controller: MyController,
    private readonly matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private menuService: MenuService
  ) {
    this.initIcons();
  }

  ngOnInit() {
    // this.controller.test().then(x => this.numbers = x);
    this.subs.sink = this.menuService.menuClosed.subscribe(
      menuIsClosed => this.menuIsClosed = menuIsClosed
    );

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private initIcons() {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logo.svg")
    );

    this.matIconRegistry.addSvgIcon(
      'news',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/news.svg")
    );
  }

}
