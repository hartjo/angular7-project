import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // console.log('api call success :', event);
          }
        },
        error => {
          if (event instanceof HttpResponse) {
            console.log('api call error :', event);
          }
        }
      )
    );
  }
}
