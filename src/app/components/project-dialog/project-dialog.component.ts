import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProjectWeb} from "../../models/project-web";
import {TaskDialogComponent, TaskDialogData} from "../task-dialog/task-dialog.component";
import {SubSink} from "../../util/SubSink";
import {filter, tap} from "rxjs";
import {LoginService} from "../../services/login.service";
import {UserWeb} from "../../models/user-web";
import {ProjectController} from "../../controller/ProjectController";
import {rndNumberId} from "../../util/RndUtil";
import {WorkRole} from "../../models/enums/work-role";
import {DialogType} from "../../models/enums/dialog-type";

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
    id: rndNumberId(),
    name: '',
    creator_id: NaN,
    creator: '',
    created_at: new Date(),
    workers:  [],
    tasks: [],
  };
  currentUser: UserWeb | undefined;

  // @ts-ignore
  taskDialogRef:MatDialogRef<TaskDialogComponent, TaskDialogData>;

  private subs = new SubSink();

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private projectController: ProjectController,
    private dialogRef:  MatDialogRef<ProjectDialogComponent, ProjectDialogData>,
  ) { }

  ngOnInit() {
    this.subs.sink = this.loginService.authInfo$.pipe(
      tap(user => {
        this.currentUser = user;
        this.project.creator = user.fullName
        this.project.creator_id = user.id
      })
    ).subscribe();
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
    this.taskDialogRef = this.dialog.open(TaskDialogComponent,{
    data: {type: DialogType.CREATE}
    });
    this.subs.sink = this.taskDialogRef.afterClosed().pipe(
      filter(data => !!data),
      tap(data => {

        if(!data?.isCreated){
          return;
        }
        this.project.tasks.push(data.task);
      })
    ).subscribe();
  }

  saveProject() {
    this.subs.sink = this.projectController.saveProject(this.project).pipe(
      tap(() => this.dialogRef.close({
        project: this.project,
        isCreated: true
      }))
    ).subscribe()
  }

  cancel() {

  }
}
