import {Component, OnDestroy, OnInit} from '@angular/core';
import {tasks} from "../master/master.component";
import {WorkTask} from "../../../models/workTask";
import {TaskStatus} from "../../../models/enums/task-status";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {TaskDialogComponent, TaskDialogData} from "../../../components/task-dialog/task-dialog.component";
import {SubSink} from "../../../util/SubSink";
import {filter} from "rxjs";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit, OnDestroy {

  TaskStatus = TaskStatus;
  displayMode:  'month' | 'year' = 'month';

  // @ts-ignore
  private dialogRef: MatDialogRef<TaskDialogComponent,TaskDialogData>;
  private subs = new SubSink();

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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

  navigateToMonth(date: Date) {
    if(this.displayMode === 'month'){
      this.dialogRef = this.dialog.open(TaskDialogComponent, {
        data:{
          deadline: date
        }
      })

      this.subs.sink = this.dialogRef.afterClosed().pipe(
        filter(taskData => !!taskData),
        // @ts-ignore
        filter(taskData => taskData.isCreated)
      ).subscribe();

      return;
    }
    this.displayMode = 'month';
  }
}
