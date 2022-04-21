import {HttpService} from "../../services/http/http.service";
import {Observable} from "rxjs";
import {UserWeb} from "../models/user-web";
import {mapBody} from "../util/RxJsUtil";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class UserController{

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('user');
  }

  loadCurrentUser(): Observable<UserWeb>{
    return mapBody(this.http.get<UserWeb>('/current-user'));
  }


}
