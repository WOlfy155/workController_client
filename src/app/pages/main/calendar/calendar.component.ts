import {Component, OnInit} from '@angular/core';
import {tasks} from "../master/master.component";
import {WorkTask} from "../../../models/workTask";
import {TaskStatus} from "../../../models/enums/task-status";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  TaskStatus = TaskStatus;
  displayMode:  'month' | 'year' = 'month';

  constructor() {
  }

  ngOnInit() {
  }

  get tasks(): WorkTask[] {
    return tasks;
  }

  compareDates(date: Date, createdAt: Date): boolean {
    return this.getDay(date) === this.getDay(createdAt) - 1;
  }

  private getDay(date: Date): number {
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  }

  navigateToMonth() {
    if(this.displayMode === 'month'){
      return;
    }
    this.displayMode = 'month';
  }
}
