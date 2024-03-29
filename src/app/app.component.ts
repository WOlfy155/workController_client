import {Component, OnDestroy, OnInit} from '@angular/core';
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
    private readonly matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private menuService: MenuService
  ) {
    this.initIcons();
  }

  ngOnInit() {
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

    this.matIconRegistry.addSvgIcon(
      'MyLove',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/MyLove.svg")
    )
  }

}
