import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskWeb} from "../../models/task-web";
import {TaskStatus} from "../../models/enums/task-status";
import {LoginService} from "../../services/login.service";
import {SubSink} from "../../util/SubSink";
import {MatDialogRef} from "@angular/material/dialog";
import {ProjectDialogData} from "../project-dialog/project-dialog.component";
import {UserController} from "../../controller/UserController";
import {UserWeb} from "../../models/user-web";

export interface TaskDialogData {
  task: TaskWeb,
  isCreated: boolean
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
  }

  workers: UserWeb[] = [];
  // @ts-ignore

  private subs = new SubSink();

  constructor(
    private loginService: LoginService,
    private userController: UserController,
    private dialogRef: MatDialogRef<TaskDialogComponent, ProjectDialogData>,
  ) {
  }

  ngOnInit() {
    this.subs.sink = this.loginService.authInfo$.subscribe(
      user => {
        this.task.creator = user.fullName;
        this.task.creatorId = user.id;
      }
    );
    this.subs.sink = this.userController.loadAllUsers().subscribe(
      allUsers => this.workers = allUsers
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
