import {WorkTask} from "./workTask";
import {Worker} from "./worker";

export class Project {
  name: string;
  creator: string;
  tasks: WorkTask[];
  workers: Worker[]

  constructor(name: string, creator: string, tasks: WorkTask[], workers: Worker[]) {
    this.name = name;
    this.creator = creator;
    this.tasks = tasks;
    this.workers = workers;
  }
}
