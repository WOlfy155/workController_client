import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class MenuService {

  private menuClosedSubject = new BehaviorSubject(false);
  public menuClosed = this.menuClosedSubject.asObservable();

  public toggleMenu(){
    this.menuClosedSubject.next(!this.menuClosedSubject.value);
    console.log("Meow");
  }

}
