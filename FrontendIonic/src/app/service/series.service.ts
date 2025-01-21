import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseMessage, ApiResponseSerie, ApiResponseSeries, Serie} from "../common/interface";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private readonly httpClient:HttpClient=inject(HttpClient)

  getSeries():Observable<ApiResponseSeries>{
    return this.httpClient.get<ApiResponseSeries>(environment.urlBase)
  }

  constructor() { }
}
