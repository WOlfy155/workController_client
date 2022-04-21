import {UserWeb} from "./user-web";
import {TaskWeb} from "./task-web";

export class ProjectWeb{
  id: number;
  name: string;
  creator_id: number;
  created_at: Date;
  workers: UserWeb[] = [];
  tasks: TaskWeb[] = [];


  constructor(id: number, name: string, creator_id: number, created_at: Date, workers: UserWeb[], tasks: TaskWeb[]) {
    this.id = id;
    this.name = name;
    this.creator_id = creator_id;
    this.created_at = created_at;
    this.workers = workers;
    this.tasks = tasks;
  }
}
