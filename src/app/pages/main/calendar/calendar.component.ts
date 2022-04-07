import {Component, OnInit} from '@angular/core';
import {tasks} from "../master/master.component";
import {WorkTask} from "../../../models/workTask";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get tasks(): WorkTask[]{
    return tasks;
  }

}
