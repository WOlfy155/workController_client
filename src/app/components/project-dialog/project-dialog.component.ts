import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Project} from "../../models/project";

export interface ProjectDialogData{
  project: Project,
  isCreated: boolean,
}

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss']
})
export class ProjectDialogComponent implements OnInit {

  project:Project = {
    name: '',
    tasks: [],
    creator:'',
    workers: []
  };

  constructor(
    private dialogRef:  MatDialogRef<ProjectDialogComponent, ProjectDialogData>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close({
      project:this.project,
      isCreated: false
    });
  }
}
