import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICountryDataModel } from '../models/country-data.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic ' + btoa('metasUser:ttt')
  })
};
@Injectable({
  providedIn: 'root'
})
export class CoronaService  {
  private baseUrl = 'https://api.covid19api.com';
  constructor(private httpClient: HttpClient) { }

  public  getCountriesData(): Observable<ICountryDataModel[]> {
    return this.httpClient.get<ICountryDataModel[]>(this.baseUrl + '/countries', httpOptions)
              .pipe(
                tap(data => this.log(data)),
                tap(data => data.sort((a, b) => this.sortCountryData(a, b))),
                catchError(this.handleError<ICountryDataModel[]>('getCountriesData', []))
              );
  }

  private sortCountryData(a: ICountryDataModel, b:ICountryDataModel) : number{
    var retVal : number = 0;
    if(a.Country.toLowerCase() == b.Country.toLowerCase()){
      retVal = 0;
    }
    else{
      if(a.Country.toLowerCase() < b.Country.toLowerCase()){
        retVal = -1;
      }
      else {
        retVal = 1;
      }
    }
    return retVal;
  }

  private log(items: ICountryDataModel[]){
    console.log('Corona service: number of countries : ' + items.length);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
