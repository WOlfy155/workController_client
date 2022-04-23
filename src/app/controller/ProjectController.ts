import {HttpService} from "../../services/http/http.service";
import {Injectable} from "@angular/core";
import {ProjectWeb} from "../models/project-web";
import {Observable} from "rxjs";
import {mapBody} from "../util/RxJsUtil";

@Injectable({providedIn: 'root'})
export class ProjectController{

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('project');
  }

  saveProject(project: ProjectWeb): Observable<void>{
    return mapBody(this.http.postValue('/save', JSON.stringify(project)))
  }

  loadUserProjects(userId: number): Observable<ProjectWeb[]>{
    return mapBody(this.http.get<ProjectWeb[]>('/load-user-projects', {userId}))
  }

}
