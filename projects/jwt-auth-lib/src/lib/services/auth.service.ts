import { Injectable } from '@angular/core';
import {catchError, retry} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthResult} from './auth-result';
import {RestApiService} from '../rest/rest-api.service';
import {UserCredentials} from '../classes/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private res: Observable<AuthResult>;
  private loginListener: (() => void)[] = [];
  private logoutListener: (() => void)[] = [];

  private accessTokenName = 'tst_access_token';

  // see also: https://www.positronx.io/angular-jwt-user-authentication-tutorial/

  constructor(private restApiService: RestApiService) {
    restApiService.addUnauthorizedListener(this.handleUnauthorizedError);
  }

  public login(credentials: UserCredentials): Observable<AuthResult> {
    console.log('try to login ' + credentials.username);
    this.res = new Observable<AuthResult>((observer) => {
      const authResult = new AuthResult();

      // tslint:disable-next-line:max-line-length
      this.restApiService.getClient().post<any>(this.restApiService.getApiURL() + '/login', credentials, this.restApiService.getHttpOptions())
        .pipe(
          catchError((err, caught) => {
            authResult.success = false;
            observer.next(authResult);
            observer.complete();
            return throwError('login failed');
          })
        )
        .subscribe((data: any) => {
          sessionStorage.setItem(this.accessTokenName, data.token);
          localStorage.setItem(this.accessTokenName, data.token); // only save this, if the token should be kepted after session closed
          console.log('logged in successfully');

          authResult.success = true;

          observer.next(authResult);
          observer.complete();

          this.loginListener.forEach((listener: () => void) => {
            listener.apply(null);
          });
        });
    });

    return this.res;
  }

  logout(): void {
    sessionStorage.removeItem(this.accessTokenName);
    const removeToken = localStorage.removeItem(this.accessTokenName);
    /*if (removeToken == null) {
      this.router.navigate(['log-in']);
    }*/

    this.logoutListener.forEach((listener: () => void) => {
      listener.apply(null);
    });
  }

  public getToken(): string {
    let token: string;

    token = localStorage.getItem(this.accessTokenName);

    if (token == null) {
      token = sessionStorage.getItem(this.accessTokenName);
    }

    return token;
  }

  get isLoggedIn(): boolean {
    const authToken = this.getToken(); // localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  public addLoginListener(listener: () => void): void {
    this.loginListener.push(listener);
  }

  public addLogoutListener(listener: () => void): void {
    this.logoutListener.push(listener);
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      alert(error.error.message);
    } else {
      if (error.status === 404) {
        /* login credentials are wrong */
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        window.alert(errorMessage);
      }
    }
    return throwError(errorMessage);
  }

  handleUnauthorizedError(error) {
    /* set user as logged off */
    this.logout();
  }

}
