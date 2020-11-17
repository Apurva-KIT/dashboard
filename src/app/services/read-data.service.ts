import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Salesman } from 'app/models/salesman.model';
import { ChartModel } from "../models/chart.model";

//header options  
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReadDataService {

  constructor(private http: HttpClient) {}

  getJSON(): Observable<Salesman[]> {
      return this.http.get<Salesman[]>("./assets/data.json");
  }

  //charts
  renderSalesPerSalesmenChartData(): Observable<any>{
  //  const url = `${this.apiUrl}renderincomechartdata`;
    return this.http.get<ChartModel[]>("./assets/data.json");
  }

  

}
