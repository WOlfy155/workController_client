import {HttpService} from "../http/http.service";
import {Injectable} from "@angular/core";
import {promisify} from "../../app/util/RxJsUtil";

@Injectable({ providedIn: 'root' })
export class MyController{

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('test');
  }

  test(): Promise<string[]>{
    return promisify(this.http.get<string[]>("/test"));
  }
  delete(id: string): Promise<void>{
    return promisify(this.http.post<void>("/delete", {id}))
  }
}

