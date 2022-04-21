import {TaskStatus} from "./enums/task-status";

export class TaskWeb{
  id: number;
  label: string;
  description: string;
  creator: string;
  createdAt: Date;
  deadLine: Date;
  executorId: number;
  projectId: number;
  status:TaskStatus;

  constructor(id: number, label: string, description: string, creator: string, createdAt: Date, deadLine: Date, executorId: number, projectId: number, status: TaskStatus) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.creator = creator;
    this.createdAt = createdAt;
    this.deadLine = deadLine;
    this.executorId = executorId;
    this.projectId = projectId;
    this.status = status;
  }
}
