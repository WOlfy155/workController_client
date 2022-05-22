import {Injectable} from "@angular/core";
import {HttpService} from "../../services/http/http.service";
import {Observable} from "rxjs";
import {NewsWeb} from "../models/news-web";
import {mapBody} from "../util/RxJsUtil";

@Injectable({ providedIn: 'root' })
export class NewsController{

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('news');
  }

  loadAllNews(): Observable<NewsWeb[]>{
    return mapBody(this.http.get("/all"));
  }

}
