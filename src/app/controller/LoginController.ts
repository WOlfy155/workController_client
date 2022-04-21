import {HttpService} from "../../services/http/http.service";
import {LoginData} from "../pages/login/login.component";
import {Observable} from "rxjs";
import {Tokens} from "../models/tokens";
import {mapBody} from "../util/RxJsUtil";
import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class LoginController{
  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('');
  }

  login(loginData: LoginData): Observable<Tokens>{
    return mapBody(this.http.post<Tokens>("login", loginData));
  }

  logout(): Observable<void>{
    return mapBody(this.http.post("logout"));
  }
}
