import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { FlatArtistDto } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  apiUrl = "http://localhost:8081/api/artists"
  constructor(private http: HttpClient) { }

  getAllArtists(): Observable<FlatArtistDto[]> {
    const url = `${this.apiUrl}`;
    console.log(`fetching all Artists `)
    return this.http.get<FlatArtistDto[]>(url)
      .pipe(
        tap(Artists => console.log(`Fetched Artists ${Artists}`)),
        catchError(this.handleError<FlatArtistDto[]>('getAllArtists'))
      );
    
  }
  // getArtist(id: number): Observable<FullArtistDto> {
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