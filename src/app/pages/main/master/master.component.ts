import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskWeb} from "../../../models/task-web";
import {LoginService} from "../../../services/login.service";
import {TaskController} from "../../../controller/TaskController";
import {UserWeb} from "../../../models/user-web";
import {SubSink} from "../../../util/SubSink";
import {switchMap, tap} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TaskDialogComponent, TaskDialogData} from "../../../components/task-dialog/task-dialog.component";
import {DialogType} from "../../../models/enums/dialog-type";

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

  tasks: TaskWeb[] = [];
  isPageLoaded = false;

  // @ts-ignore
  private dialogRef: MatDialogRef<TaskDialogComponent,TaskDialogData>;

  private currentUser: UserWeb | undefined;
  private subs = new SubSink();

  constructor(
    private loginService: LoginService,
    private taskController: TaskController,
    private matDialog: MatDialog,
  ) { }

  ngOnInit() {
    this.subs.sink = this.loginService.authInfo$.pipe(
      tap(user => this.currentUser = user),
      switchMap(user => this.taskController.loadUserTasks(user.id)),
      tap(tasks => this.tasks = tasks),
      tap(() => this.isPageLoaded = true)
    ).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  openTaskForView(task: TaskWeb) {
    this.dialogRef = this.matDialog.open(TaskDialogComponent,{
      data: {
        task,
        type: DialogType.VIEW,

      }
    });
  }
}
