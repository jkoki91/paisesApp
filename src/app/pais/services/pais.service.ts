import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})

export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'
  private apiUrl2: string = 'https://restcountries.com/v2'

  get httpParams () {
    return new HttpParams().set('fields','flag,name,population,alpha2Code,capital');
  }

  constructor( private http: HttpClient ) { }

  buscarPais( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${ termino }`;
    return this.http.get<Country[]>(url);
            // .pipe(
            //   catchError( err => of(['hola mundo']))
            // );
  }

  buscarCapital( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${ termino }`;
    return this.http.get<Country[]>(url);
  }

  getPaisPorAlpha( id: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<Country[]>(url);
  }

  getPaisPorregion( region: string ): Observable<Country[]> { 
    // const url = `${ this.apiUrl2 }/regionalbloc/${ region }?fields=flag,name,population,alpha2code`; //sin el httpParams
    const url = `${ this.apiUrl2 }/regionalbloc/${ region }`;
    return this.http.get<Country[]>(url, {params: this.httpParams })
            .pipe(
              tap( console.log )
            );
  }
}
