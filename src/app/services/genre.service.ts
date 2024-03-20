import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { FlatGenreDto } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  apiUrl = "http://localhost:8081/api/genres"
  constructor(private http: HttpClient) { }

  getAllGenres(): Observable<FlatGenreDto[]> {
    const url = `${this.apiUrl}`;
    console.log(`fetching all Genres `)
    return this.http.get<FlatGenreDto[]>(url)
      .pipe(
        tap(Genres => console.log(`Fetched Genres ${Genres}`)),
        catchError(this.handleError<FlatGenreDto[]>('getAllGenres'))
      );
    
  }
  // getGenre(id: number): Observable<FullGenreDto> {
  //   const url = `${this.apiUrl}/${id}`;
  //   console.log(`fetching user with id`,id)
  //   return this.http.get<FlatUserDto>(url)
  //     .pipe(
  //       tap(_ => console.log(`Fetched user with id ${id}`)),
  //       catchError(this.handleError<FlatUserDto>('getUser'))
  //     );
    
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
