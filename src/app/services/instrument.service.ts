import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, of } from 'rxjs';
import { FlatInstrumentDto, FlatUserDto } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {

  apiUrl = "http://localhost:8081/api/instruments"
  constructor(private http: HttpClient) { }

  getAllInstruments(): Observable<FlatInstrumentDto[]> {
    const url = `${this.apiUrl}`;
    console.log(`fetching all instruments `)
    return this.http.get<FlatInstrumentDto[]>(url)
      .pipe(
        tap(instruments => console.log(`Fetched instruments ${instruments}`)),
        catchError(this.handleError<FlatInstrumentDto[]>('getAllInstruments'))
      );
    
  }
  // getInstrument(id: number): Observable<FullInstrumentDto> {
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
