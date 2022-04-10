import {Component, OnInit} from '@angular/core';
import {WorkTask} from "../../../models/workTask";
import {TaskStatus} from "../../../models/enums/task-status";

export const tasks: WorkTask[] = [
  {
    name:'task1',
    text: 'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas',
    status: TaskStatus.ACTIVE,
    author: 'Me',
    deadline: new Date()
  },
  {
    name:'task2',
    text: 'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas',
    status: TaskStatus.DONE,
    author: 'Me',
    deadline: new Date()
  },
  {
    name:'task3',
    text: 'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas' +
      'asdasdasdasdasdas dasdasdasdasdasdasdasdasdasdasd asdasdasdasdasdasd asdasdasdas dasdasdasd asdasdasdasdasdas dasdasdasdas dasdasdasd asdasdasd asdasdasdasdasda sdasdasdasdasda sdasdasdasdasda sdasdasdasdas dasdasdasdasdasda sdasdasdasdasd asdasdasdasda sdasdasdasdasdasd asdasdasdasdasd asdasdasdasdas dasdasdasdasdas',
    status: TaskStatus.OVERDUE,
    author: 'Me',
    deadline: new Date()
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

  get tasks(): WorkTask[]{
    return tasks
  }
}
