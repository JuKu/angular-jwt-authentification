import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

// @ts-ignore
import { environment } from '@environment/environment';
import {newArray} from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  /* list with listeners for unauthorized errors, e.q. to logout user */
  private unauthorizedListener: ((error: object) => void)[] = [];

  constructor(private http: HttpClient) {
  }

  // Define API
  apiURL = environment.apiUrl;

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };

  public getApiURL(): string {
    return this.apiURL;
  }

  public getHttpOptions(): object {
    return this.httpOptions;
  }

  public getClient(): HttpClient {
    return this.http;
  }

  public addUnauthorizedListener(listener: (error: object) => void): void {
    this.unauthorizedListener.push(listener);
  }

  // Error handling
  // @ts-ignore
  handleError(error): object {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      if (error.status === 401) {
        /* unauthorized */

        // @ts-ignore
        this.unauthorizedListener.forEach((listener: (error) => void) => {
          // @ts-ignore
          listener.apply(error);
        });

        return throwError('not logged in');
      }

      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
