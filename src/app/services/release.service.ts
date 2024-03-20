import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { FlatReleaseWtihArtistsDto } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {

  apiUrl = "http://localhost:8081/api/releases"
  constructor(private http: HttpClient) { }

  getAllReleases(): Observable<FlatReleaseWtihArtistsDto[]> {
    const url = `${this.apiUrl}`;
    console.log(`fetching all Releases `)
    return this.http.get<FlatReleaseWtihArtistsDto[]>(url)
      .pipe(
        tap(Releases => console.log(`Fetched Releases ${Releases}`)),
        catchError(this.handleError<FlatReleaseWtihArtistsDto[]>('getAllReleases'))
      );
    
  }
  // getRelease(id: number): Observable<FullReleaseDto> {
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