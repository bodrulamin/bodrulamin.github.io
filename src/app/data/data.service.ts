import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {jsonData} from "./dummy.data";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {

  }

  // getJsonData(): Observable<any> {
  //   return this.http.get<any>('https://raw.githubusercontent.com/bodrulamin/bodrulamin.web.app/master/jsonData');
  // }
  visitorCount(): Observable<any> {
    return this.http.get<{ value: number }>(`https://api.countapi.xyz/hit/bodrulamin.github.io/profile`);

  }
  getJsonData(): Observable<any> {
    return of(jsonData);
  }
}
