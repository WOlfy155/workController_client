import {Injectable} from "@angular/core";
import {HttpService} from "../../services/http/http.service";
import {TaskWeb} from "../models/task-web";
import {Observable} from "rxjs";
import {mapBody} from "../util/RxJsUtil";

@Injectable({providedIn: 'root'})
export class TaskController{

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('task');
  }

  saveTask(task: TaskWeb): Observable<void>{
    return mapBody(this.http.postValue('/save', JSON.stringify(task)));
  }

  loadUserTasks(executorId: number): Observable<TaskWeb[]>{
    return mapBody(this.http.post("/user-tasks", {executorId}))
  }

}
