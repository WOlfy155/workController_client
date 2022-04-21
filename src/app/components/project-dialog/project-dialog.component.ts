import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProjectWeb} from "../../models/project-web";
import {TaskDialogComponent, TaskDialogData} from "../task-dialog/task-dialog.component";

export interface ProjectDialogData{
  project: ProjectWeb,
  isCreated: boolean,
}

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  project:ProjectWeb = {
    id: NaN,
    name: '',
    creator_id: NaN,
    created_at: new Date(),
    workers:  [],
    tasks: [],
  };

  // @ts-ignore
  taskDialogRef:MatDialogRef<TaskDialogComponent, TaskDialogData>;

  constructor(
    private dialogRef:  MatDialogRef<ProjectDialogComponent, ProjectDialogData>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close({
      project:this.project,
      isCreated: false
    });
  }

  addWorker() {

  }

  addTask() {
    this.taskDialogRef = this.dialog.open(TaskDialogComponent,{});
  }
}
