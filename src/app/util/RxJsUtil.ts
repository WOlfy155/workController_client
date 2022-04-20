import {HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {map} from "rxjs";


export const promisify: <T>(observable: Observable<HttpResponse<T>>) => Promise<T>
  = <T>(observable: Observable<HttpResponse<T>>) =>
// @ts-ignore
  (observable.toPromise().then(x => x.body as T) as Promise<T>);

export const mapBody: <T>(observable: Observable<HttpResponse<T>>) => Observable<T>
  = <T>(observable: Observable<HttpResponse<T>>) => observable.pipe(map(x => x.body as T));

