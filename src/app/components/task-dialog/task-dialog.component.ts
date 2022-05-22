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
import {rndNumberId} from "../../util/RndUtil";
import {DialogType} from "../../models/enums/dialog-type";

export interface TaskDialogData {
  task: TaskWeb ,
  isCreated: boolean ,
  deadline: Date ,
  type: DialogType
}

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit, OnDestroy {

  task: TaskWeb = {
    id: rndNumberId(),
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

  dialogType: DialogType;

  // @ts-ignore
  private subs = new SubSink();

  constructor(
    private loginService: LoginService,
    private taskController: TaskController,
    private userController: UserController,
    private dialogRef: MatDialogRef<TaskDialogComponent, TaskDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
  ) {
    this.dialogType = data.type;

    if(data?.deadline){
      this.task.deadLine = data.deadline;
    }

    if(data?.task){
      this.task = data.task;
    }
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
    ).subscribe(
      () => this.dialogRef.close({
        task: this.task,
        isCreated: true,
        deadline: this.task.deadLine,
        type: this.dialogType,
      })
    )
  }

  get showAcceptButtons(): boolean{
    return this.dialogType !== DialogType.VIEW;
  }

  get isViewDialog(): boolean{
    return this.dialogType === DialogType.VIEW;
  }
  get dialogLabel(): string {
    switch (this.dialogType){
      case DialogType.CREATE:
        return 'Создание задачи';
      case DialogType.EDIT:
        return 'Редактирование задачи';
      case DialogType.VIEW:
        return 'Просмотр задачи';
      default:
        return '';
    }
  }

  setStatusDone(){
    this.task.status = TaskStatus.DONE;
    this.saveTask();
  }

  cancel() {

  }
}
