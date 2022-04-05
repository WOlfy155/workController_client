import {Component, NgModule, OnInit} from '@angular/core';
import {Task} from "../../models/task";
import {TaskStatus} from "../../models/enums/task-status";
import {CommonModule} from "@angular/common";
import {MatCardModule} from "@angular/material/card";

export const tasks: Task[] = [
  {
    name:'task1',
    text: 'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas',
    status: TaskStatus.ACTIVE,
    author: 'Me',
    createdAt: new Date()
  },
  {
    name:'task2',
    text: 'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas',
    status: TaskStatus.ACTIVE,
    author: 'Me',
    createdAt: new Date()
  },
  {
    name:'task3',
    text: 'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas',
    status: TaskStatus.ACTIVE,
    author: 'Me',
    createdAt: new Date()
  },

];

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get tasks(): Task[]{
    return tasks
  }
}

@NgModule({
  declarations: [MasterComponent],

  imports: [CommonModule, MatCardModule],

  exports: [MasterComponent],
})
export class MasterModule {}
