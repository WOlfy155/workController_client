import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if(err instanceof HttpResponse && err.status === 403){
          console.log("1J76NOp36l :: pizdec");
          this.router.navigate(['/login']);
        }
        return throwError(err);
      })
    );
  }

}
