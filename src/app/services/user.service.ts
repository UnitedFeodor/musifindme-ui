import { Injectable } from '@angular/core';
import { CreateUserDto, FlatUserDto, FullUserDto } from '../interfaces/user';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:8081/api/users"
  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<FlatUserDto> {
    const url = `${this.apiUrl}/${id}`;
    console.log(`fetching user with id`,id)
    return this.http.get<FlatUserDto>(url)
      .pipe(
        tap(_ => console.log(`Fetched user with id ${id}`)),
        catchError(this.handleError<FlatUserDto>('getUser'))
      );
    
  }

  createUser(userDto: CreateUserDto): Observable<FullUserDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<FullUserDto>(this.apiUrl, userDto, httpOptions)
      .pipe(
        tap(user => console.log('User created successfully',user)),
        catchError(this.handleError<FullUserDto>('createUser'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
