import {WorkRole} from "./enums/work-role";
import {TaskWeb} from "./task-web";

export class UserWeb{
   id: number;
  username: string;
  fullName: string;
  password: string;
  workingFrom: Date;
  profileImgUrl: string;
  role: WorkRole;
  tasks: TaskWeb[] = [];


  constructor(id: number, username: string, fullName: string, password: string, workingFrom: Date, profileImgUrl: string, role: WorkRole, tasks: TaskWeb[]) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.password = password;
    this.workingFrom = workingFrom;
    this.profileImgUrl = profileImgUrl;
    this.role = role;
    this.tasks = tasks;
  }
}
