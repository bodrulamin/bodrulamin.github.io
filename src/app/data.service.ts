import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) {

  }

  getJsonData(): Observable<any> {
    return this.http.get<any>('https://raw.githubusercontent.com/bodrulamin/bodrulamin.web.app/master/jsonData');
  }
}
