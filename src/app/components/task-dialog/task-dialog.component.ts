import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TaskWeb} from "../../models/task-web";
import {TaskStatus} from "../../models/enums/task-status";
import {LoginService} from "../../services/login.service";
import {SubSink} from "../../util/SubSink";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserController} from "../../controller/UserController";
import {UserWeb} from "../../models/user-web";
import {switchMap, tap} from "rxjs";
import {TaskController} from "../../controller/TaskController";

export interface TaskDialogData {
  task: TaskWeb,
  isCreated: boolean,
  deadline: Date,
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit, OnDestroy {

  task: TaskWeb = {
    id: NaN,
    label: '',
    description: '',
    creator: '',
    creatorId: NaN,
    createdAt: new Date(),
    deadLine: new Date(),
    executorId: NaN,
    projectId: NaN,
    status: TaskStatus.ACTIVE
  };

  workers: UserWeb[] = [];
  // @ts-ignore
  private subs = new SubSink();

  constructor(
    private loginService: LoginService,
    private taskController: TaskController,
    private userController: UserController,
    private dialogRef: MatDialogRef<TaskDialogComponent, TaskDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
  ) {

    if(!data?.deadline){
      return;
    }
    this.task.deadLine = data.deadline;
  }

  ngOnInit() {
    this.subs.sink = this.loginService.authInfo$.pipe(
      tap(user => {
        this.task.creator = user.fullName;
        this.task.creatorId = user.id;
      }),
      switchMap(() => this.userController.loadAllUsers()),
      tap(allUsers => this.workers = allUsers),
    ).subscribe();

  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  // private checkFormStatus(status: FormControlStatus) {
  //   switch(status){
  //     case 'VALID':
  //       this.isDisabled = false;
  //       this.isChanged = false;
  //       break;
  //
  //     case 'INVALID':
  //       this.isDisabled = true;
  //       this.isChanged = true;
  //       break;
  //
  //     case 'PENDING':
  //       this.isDisabled = false;
  //       this.isChanged = true;
  //       break;
  //
  //     case 'DISABLED':
  //       this.isDisabled = true;
  //       this.isChanged = true;
  //       break;
  //
  //     default:
  //       this.isDisabled = false;
  //       this.isChanged = false;
  //   }
  // }
  saveTask() {
    this.subs.sink = this.taskController.saveTask(this.task).pipe(
      tap(() => console.dir(this.task))
    ).subscribe(
      () => this.dialogRef.close({
        task: this.task,
        isCreated: true,
        deadline: this.task.deadLine
      })
    )
  }

  cancel() {

  }
}
