import { Component, OnInit } from '@angular/core';
import {Project} from "../../../models/project";
import {tasks} from "../master/master.component";

export const projects: Project[] = [
  {
    name: 'project1',
    creator: 'me',
    tasks: tasks
  },
  {
    name: 'project2',
    creator: 'me',
    tasks: tasks
  },
  {
    name: 'project3',
    creator: 'me',
    tasks: tasks
  },
  {
    name: 'project4',
    creator: 'me',
    tasks: tasks
  },
  {
    name: 'project5',
    creator: 'me',
    tasks: tasks
  },
  {
    name: 'project6',
    creator: 'me',
    tasks: tasks
  },
  {
    name: 'project7',
    creator: 'me',
    tasks: tasks
  },
  {
    name: 'project8',
    creator: 'me',
    tasks: tasks
  }
]

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  mouseOnAddNew = false;

  constructor() { }

  ngOnInit(): void {
  }

  mouseOn(){
    console.log("in")
    this.mouseOnAddNew = true;
  }

  mouseOut(){
    console.log("out")
    this.mouseOnAddNew = false;
  }

  get projects(): Project[]{
    return projects;
  }

}
