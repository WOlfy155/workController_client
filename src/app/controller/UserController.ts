import {HttpService} from "../../services/http/http.service";
import {Observable} from "rxjs";
import {UserWeb} from "../models/user-web";
import {mapBody} from "../util/RxJsUtil";
import {Injectable} from "@angular/core";
import {UserInfo} from "../models/user-info";

@Injectable({providedIn: 'root'})
export class UserController {

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('user');
  }

  loadCurrentUser(): Observable<UserWeb> {
    return mapBody(this.http.get<UserWeb>('/current-user'));
  }

  loadAllUsers(): Observable<UserWeb[]> {
    return mapBody(this.http.get<UserWeb[]>('/all-users'));
  }

  loadUserInfo(userId: number): Observable<UserInfo> {
    return mapBody(this.http.get('/load-user-info', {userId}))
  }

  upsertUser(user: UserWeb): Observable<void>{
    return mapBody(this.http.postValue('/upsert-user', JSON.stringify(user)))
  }

}
