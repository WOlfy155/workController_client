export class UserInfo {

  allTasksCount: number;
  projectsCount: number;
  doneTasksCount: number;
  overdueTasksCount: number;

  constructor(allTasksCount: number, projectsCount: number, doneTasksCount: number, overdueTasksCount: number) {
    this.allTasksCount = allTasksCount;
    this.projectsCount = projectsCount;
    this.doneTasksCount = doneTasksCount;
    this.overdueTasksCount = overdueTasksCount;
  }
}
