import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {BehaviorSubject, throwError} from "rxjs";
import {User} from "./user";
import {Router} from "@angular/router";

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
  tokenExpirationTimer;

  constructor(private httpClient: HttpClient,
              private router: Router) {
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

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }

  autoLogin() {
    const userData :{
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() =>{
      this.logout();
    }, expirationDuration);
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
    this.autoLogout(+expiresIn * 1000);
    //this.autoLogout(2000);
    localStorage.setItem('userData', JSON.stringify(user));
  }


}
