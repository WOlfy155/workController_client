import {WorkRole} from "./enums/work-role";
import {TaskWeb} from "./task-web";

export class UserWeb{
   id: number;
  username: string;
  fullName: string;
  workingFrom: Date;
  profileImgUrl: string;
  role: WorkRole;
  tasks: TaskWeb[] = [];


  // private Long id;
  // private String username;
  // private String fullName;
  // private Date workingFrom;
  // private String profileImgUrl;
  // private WorkRole role;
  // private List<TaskWeb> tasks;


  constructor(id: number, username: string, fullName: string, workingFrom: Date, profileImgUrl: string, role: WorkRole, tasks: TaskWeb[]) {
    this.id = id;
    this.username = username;
    this.fullName = fullName;
    this.workingFrom = workingFrom;
    this.profileImgUrl = profileImgUrl;
    this.role = role;
    this.tasks = tasks;
  }
}
