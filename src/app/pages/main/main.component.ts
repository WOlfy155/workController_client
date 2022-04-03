import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from "../../services/menu.service";
import {SubSink} from "../../util/SubSink";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  menuIsClosed = false;

  private subs = new SubSink();

  constructor(
    private menuService: MenuService,
    ) { }

  ngOnInit(): void {
    this.subs.sink = this.menuService.menuClosed.subscribe(
      menuIsClosed => this.menuIsClosed = menuIsClosed
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
