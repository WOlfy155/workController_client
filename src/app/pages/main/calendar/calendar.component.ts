import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskStatus} from "../../../models/enums/task-status";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TaskDialogComponent, TaskDialogData} from "../../../components/task-dialog/task-dialog.component";
import {SubSink} from "../../../util/SubSink";
import {filter, switchMap, tap} from "rxjs";
import {UserWeb} from "../../../models/user-web";
import {LoginService} from "../../../services/login.service";
import {WorkRole} from "../../../models/enums/work-role";
import {TaskController} from "../../../controller/TaskController";
import {TaskWeb} from "../../../models/task-web";
import {DialogType} from "../../../models/enums/dialog-type";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  TaskStatus = TaskStatus;
  displayMode:  'month' | 'year' = 'month';
  tasks: TaskWeb[] = []

  // @ts-ignore
  private dialogRef: MatDialogRef<TaskDialogComponent,TaskDialogData>;
  private currentUser: UserWeb | undefined;
  private subs = new SubSink();

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private taskController: TaskController
  ) {
  }

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

  compareDates(date: Date, createdAt: Date): boolean {
    return this.getDay(date) === this.getDay(new Date(createdAt)) - 1;
  }

  private getDay(date: Date): number {
    return Math.floor(date.getTime() / (1000 * 60 * 60 * 24));
  }

  navigateToMonth(date: Date) {
    if(this.displayMode === 'month'){
      this.createTask(date);
      return;
    }
    this.displayMode = 'month';
  }

  private createTask(date: Date) {

    if(this.currentUser?.role !== WorkRole.MANAGER){
      return;
    }

    this.dialogRef = this.dialog.open(TaskDialogComponent, {
      data: {
        deadline: date,
        type: DialogType.CREATE
      }
    })

    this.subs.sink = this.dialogRef.afterClosed().pipe(
      filter(taskData => !!taskData),
      // @ts-ignore
      filter(taskData => taskData?.isCreated),
      // @ts-ignore
      tap(taskData => this.tasks.push(taskData?.task))
    ).subscribe();
  }
}
