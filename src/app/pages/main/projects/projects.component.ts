import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProjectDialogComponent, ProjectDialogData} from "../../../components/project-dialog/project-dialog.component";
import {SubSink} from "../../../util/SubSink";
import {UserWeb} from "../../../models/user-web";
import {LoginService} from "../../../services/login.service";
import {filter, switchMap, tap} from "rxjs";
import {WorkRole} from "../../../models/enums/work-role";
import {ProjectController} from "../../../controller/ProjectController";
import {ProjectWeb} from "../../../models/project-web";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  mouseOnAddNew = false;
  currentUser: UserWeb | undefined;
  projects: ProjectWeb[] =[];
  isPageLoaded = false;

  // @ts-ignore
  private subs = new SubSink();
  // @ts-ignore
  private dialogRef: MatDialogRef<ProjectDialogComponent,ProjectDialogData>;

  constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private projectController: ProjectController
  ) { }

  ngOnInit() {
    this.subs.sink = this.loginService.authInfo$.pipe(
      tap(user => this.currentUser = user),
      switchMap(user => this.projectController.loadUserProjects(user.id)),
      tap(projects => this.projects = projects),
      tap(() => this.isPageLoaded = true)
    ).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  mouseOn(){
    this.mouseOnAddNew = true;
  }

  mouseOut(){
    this.mouseOnAddNew = false;
  }

  openProjectDialog() {
    this.dialogRef = this.dialog.open(ProjectDialogComponent, {
    });
    this.subs.sink = this.dialogRef.afterClosed().pipe(
      filter(projectData => !!projectData),
      //@ts-ignore
      filter(projectData => projectData.isCreated),
      //@ts-ignore
      tap(projectData => this.projects.push(projectData.project))
    ).subscribe();

  }

  get isManager(): boolean{
    if(!this.currentUser){
      return false;
    }
    return this.currentUser.role === WorkRole.MANAGER;
  }
}
