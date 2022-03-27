import {Component, OnDestroy, OnInit} from '@angular/core';
import {MyController} from "../services/controller/MyController";
import {SubSink} from "./util/SubSink";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  title = 'workController_client';
  sub = new SubSink();
  numbers: string[] = [];

  constructor(private readonly controller: MyController) {
  }

  ngOnInit() {
    this.controller.test().then(x => this.numbers = x);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  delete(number: string) {
    console.dir(number);
    this.controller.delete(number).then();
  }
}
