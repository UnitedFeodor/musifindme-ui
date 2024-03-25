import { Injectable } from '@angular/core';
import { CreateUserDto, FlatUserDto, FullUserDto, LoginRequestDto } from '../interfaces/user';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = "http://localhost:8081/api/auth"
  constructor(private http: HttpClient) { }

 
  registerUser(userDto: CreateUserDto): Observable<FullUserDto> {

    const url = `${this.apiUrl}/signup`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<FullUserDto>(url, userDto, httpOptions)
      .pipe(
        tap(user => console.log('User registered successfully',user)),
        catchError(this.handleError<FullUserDto>('createUser', true))
      );
  }

  signInUser(loginRequest: LoginRequestDto): Observable<FullUserDto> {
    const url = `${this.apiUrl}/signin`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<FullUserDto>(url, loginRequest, httpOptions).pipe(
      tap(user => console.log('User signed in successfully', user)),
      catchError(this.handleError<FullUserDto>('signIn', true))
    );
  }

 
  private handleError<T>(operation = 'operation', rethrow?: boolean, result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      if (rethrow === true) {
        throw error;
      } else {
        return of(result as T);
      }
    };
  }
}
