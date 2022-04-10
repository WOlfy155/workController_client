import {WorkTask} from "./workTask";

export class Project {
  name: string;
  creator: string;
  tasks: WorkTask[];

  constructor(name: string, creator: string, tasks: WorkTask[]) {
    this.name = name;
    this.creator = creator;
    this.tasks = tasks;
  }
}
