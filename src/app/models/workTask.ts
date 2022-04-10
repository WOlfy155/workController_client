import {TaskStatus} from "./enums/task-status";

export class WorkTask {
  name: string;
  text: string;
  deadline: Date;
  status: TaskStatus;
  author: string;
  authorAvatar?: any;

  constructor(name: string, text: string, createdAt: Date, status: TaskStatus, createdBy: string) {
    this.name = name;
    this.text = text;
    this.deadline = createdAt;
    this.status = status;
    this.author = createdBy;
  }
}
