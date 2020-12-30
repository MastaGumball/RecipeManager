import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshTokem: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);


  constructor(private httpClient: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5VuYE6KpxbfmbxZ-AupAvKRNffbCkwEU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(
      catchError(errorRes => {
        return this.handleErrorMessage(errorRes);
      }),
      tap(response => {
          this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
        }
      ));
  }

  signIn(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5VuYE6KpxbfmbxZ-AupAvKRNffbCkwEU',
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorRes => {
        return this.handleErrorMessage(errorRes);
      }),
      tap(response => {
          this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
        }
      )
    );
  }

  private handleErrorMessage(errorRes: any) {
    console.log(errorRes);
    let errorMessage = 'An unknown error occured !';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorRes);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS' : {
        errorMessage = 'this e-mail already exist';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'This e-mail is not registered';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'invalid e-mail or password';
        break;
      }
      default: {
        errorMessage = 'An error occured';
        break;
      }
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + (+expiresIn * 1000));
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
