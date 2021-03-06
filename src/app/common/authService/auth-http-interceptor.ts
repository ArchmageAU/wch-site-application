
import {throwError as observableThrowError, Observable} from 'rxjs';

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
	constructor(private router: Router) {

	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(request).do((event: HttpEvent<any>) => {}, (err: any) => {
			if (err instanceof HttpErrorResponse) {
				if (err.status === 401 || err.status === 403) {
					this.router.navigate(['sign-in']);
					return observableThrowError(err);
				}
			}
		});
	}
}