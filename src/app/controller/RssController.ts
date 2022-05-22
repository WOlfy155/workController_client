import {Injectable} from "@angular/core";
import {HttpService} from "../../services/http/http.service";

@Injectable({ providedIn: 'root' })
export class RssController{

  private readonly http: HttpService;

  constructor(http: HttpService) {
    this.http = http.setControllerPrefix('rss');
  }

  loadRssFeed() {
    return this.http.get('/feed');
  }


}
