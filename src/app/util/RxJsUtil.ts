import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


export const promisify: <T>(observable: Observable<HttpResponse<T>>) => Promise<T>
  = <T>(observable: Observable<HttpResponse<T>>) =>
// @ts-ignore
  (observable.toPromise().then(x => x.body as T) as Promise<T>);

