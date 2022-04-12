import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from "../../../models/project";
import {tasks} from "../master/master.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProjectDialogComponent, ProjectDialogData} from "../../../components/project-dialog/project-dialog.component";
import {SubSink} from "../../../util/SubSink";

export const projects: Project[] = [
  {
    name: 'project1',
    creator: 'me',
    tasks: tasks,
    workers: []
  },
  {
    name: 'project2',
    creator: 'me',
    tasks: tasks,
    workers: []
  },
  {
    name: 'project3',
    creator: 'me',
    tasks: tasks,
    workers: []
  },
  {
    name: 'project4',
    creator: 'me',
    tasks: tasks,
    workers: []
  },
  {
    name: 'project5',
    creator: 'me',
    tasks: tasks,
    workers: []
  },
  {
    name: 'project6',
    creator: 'me',
    tasks: tasks,
    workers: []
  },
  {
    name: 'project7',
    creator: 'me',
    tasks: tasks,
    workers: []
  },
  {
    name: 'project8',
    creator: 'me',
    tasks: tasks,
    workers: []
  }
]

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {

  mouseOnAddNew = false;

  // @ts-ignore
  private subs = new SubSink();
  // @ts-ignore
  private dialogRef: MatDialogRef<ProjectDialogComponent,ProjectDialogData>;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
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
    this.subs.sink = this.dialogRef.afterClosed().subscribe();

  }

  get projects(): Project[]{
    return projects;
  }
}
