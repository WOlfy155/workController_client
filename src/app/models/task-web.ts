import {TaskStatus} from "./enums/task-status";

export class TaskWeb{
  id: number;
  label: string;
  description: string;
  creator: string;
  creatorId: number;
  createdAt: Date;
  deadLine: Date;
  executorId: number;
  projectId: number;
  status:TaskStatus;

  //
  // private Long id;
  // private String label;
  // private String description;
  // private String creator;
  // private Long creatorId;
  // private Date createdAt;
  // private Date deadLine;
  // private Long executorId;
  // private Long projectId;
  // private TaskStatus status;

  constructor(id: number, label: string, description: string, creator: string, creatorId: number, createdAt: Date, deadLine: Date, executorId: number, projectId: number, status: TaskStatus) {
    this.id = id;
    this.label = label;
    this.description = description;
    this.creator = creator;
    this.creatorId = creatorId;
    this.createdAt = createdAt;
    this.deadLine = deadLine;
    this.executorId = executorId;
    this.projectId = projectId;
    this.status = status;
  }
}
