import {TaskStatus} from "./enums/task-status";

export class Task {
  name: string;
  text: string;
  createdAt: Date;
  status: TaskStatus;
  author: string;
  authorAvatar?: any;

  constructor(name: string, text: string, createdAt: Date, status: TaskStatus, createdBy: string) {
    this.name = name;
    this.text = text;
    this.createdAt = createdAt;
    this.status = status;
    this.author = createdBy;
  }
}
