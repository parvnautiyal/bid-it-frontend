import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, catchError, filter, Observable, switchMap, take, throwError} from 'rxjs';
import {HttpService} from "../services/http.service";
import {TokenService} from "../services/token.service";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private tokenService: TokenService, private httpService: HttpService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // console.log("INTERCEPTING");
    let authReq = request;
    const token = this.tokenService.getAccessToken();
    if (request.url.includes('/auth'))
      return next.handle(request);
    else {
      // console.log("AUTHENTICATING");
      if (token != null) {
        authReq = this.addTokenHeader(request, token);
      }
      return next.handle(authReq).pipe(catchError(err => {
        if (!authReq.url.includes('/auth') && err.status === 401) {
          return this.handle401Error(authReq, next);
        }
        return throwError(() => err);
      }))
    }
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    // console.log('HANDLING TOKEN REFRESH')
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      if (this.tokenService.getRefreshToken())
        return this.httpService.getNewAccessToken().pipe(
          switchMap((token) => {
            this.isRefreshing = false;
            // console.log('OLD TOKEN ' + this.tokenService.getToken())
            this.tokenService.setAccessToken(token.body['accessToken']);
            // console.log('NEW TOKEN ' + this.tokenService.getToken())
            this.refreshTokenSubject.next(token.body['accessToken']);
            return next.handle(this.addTokenHeader(request, token.body['accessToken']));
          }),
          catchError(err => {
            this.isRefreshing = false;
            this.tokenService.clearSession();
            this.router.navigate(['/login'])
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}
