import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { FlatSongDto, FlatSongWithArtistsDto } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  apiUrl = "http://localhost:8081/api/songs"
  constructor(private http: HttpClient) { }

  getAllSongs(): Observable<FlatSongWithArtistsDto[]> {
    const url = `${this.apiUrl}`;
    console.log(`fetching all Songs `)
    return this.http.get<FlatSongWithArtistsDto[]>(url)
      .pipe(
        tap(Songs => console.log(`Fetched Songs ${Songs}`)),
        catchError(this.handleError<FlatSongWithArtistsDto[]>('getAllSongs'))
      );
    
  }
  // getSong(id: number): Observable<FullSongDto> {
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