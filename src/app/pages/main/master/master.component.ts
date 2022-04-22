import {Component, OnDestroy, OnInit} from '@angular/core';
import {WorkTask} from "../../../models/workTask";
import {TaskStatus} from "../../../models/enums/task-status";
import {TaskWeb} from "../../../models/task-web";
import {LoginService} from "../../../services/login.service";
import {TaskController} from "../../../controller/TaskController";
import {UserWeb} from "../../../models/user-web";
import {SubSink} from "../../../util/SubSink";
import {switchMap, tap} from "rxjs";

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
export class MasterComponent implements OnInit, OnDestroy {

  tasks: TaskWeb[] = [];

  private currentUser: UserWeb | undefined;
  private subs = new SubSink();

  constructor(
    private loginService: LoginService,
    private taskController: TaskController
  ) { }

  ngOnInit() {
    this.subs.sink = this.loginService.authInfo$.pipe(
      tap(user => this.currentUser = user),
      switchMap(user => this.taskController.loadUserTasks(user.id)),
      tap(tasks => this.tasks = tasks)
    ).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
