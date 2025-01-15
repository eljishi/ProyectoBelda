import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  ApiResponseMessage,
  ApiResponseSerie, ApiResponseSerieCategorias,
  ApiResponseSeries,
  Serie
} from "../common/serie";
import {enviorment} from "../enviorments/environment";

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private readonly http: HttpClient=inject(HttpClient);

  constructor() { }
  getSeries():Observable<ApiResponseSeries> {
    return this.http.get<ApiResponseSeries>(enviorment.apiUrl);
  }
  getSerie(id:string):Observable<ApiResponseSerie> {
    return this.http.get<ApiResponseSerie>(enviorment.apiUrl+'serie/'+id);
  }
  getCategorias():Observable<ApiResponseSerieCategorias> {
    return this.http.get<ApiResponseSerieCategorias>((enviorment.apiUrl+'categorias'));
  }

  addSerie(serie:Serie):Observable<ApiResponseMessage> {
    return this.http.post<ApiResponseMessage>(enviorment.apiUrl,serie)
  }

  updateSerie(serie:Serie):Observable<ApiResponseMessage> {
    return this.http.put<ApiResponseMessage>(enviorment.apiUrl+serie._id,serie)
  }
  deleteSerie(id:string):Observable<ApiResponseMessage> {
    return this.http.delete<ApiResponseMessage>(enviorment.apiUrl+id)
  }
}
