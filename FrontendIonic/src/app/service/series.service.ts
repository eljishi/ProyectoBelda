import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ApiResponseSerie,
  ApiResponseSerieCategorias,
  ApiResponseSeries,
} from "../common/interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private readonly httpClient:HttpClient=inject(HttpClient)

  getSeries():Observable<ApiResponseSeries>{
    return this.httpClient.get<ApiResponseSeries>(environment.urlBase)
  }
  getCategorias():Observable<ApiResponseSerieCategorias> {
    return this.httpClient.get<ApiResponseSerieCategorias>((environment.urlBase+'categorias'));
  }
  getSerie(id:string):Observable<ApiResponseSerie>{
    return this.httpClient.get<ApiResponseSerie>(environment.urlBase+"serie/"+id)
  }
  searchSeries(query: string): Observable<ApiResponseSeries> {
    return this.httpClient.get<ApiResponseSeries>(`${environment.urlBase}search?query=${query}`);
  }
  getSerieCategoria(categoria: string): Observable<ApiResponseSeries> {
    return this.httpClient.get<ApiResponseSeries>(`${environment.urlBase}categoria/${categoria}`);
  }

  constructor() { }
}
