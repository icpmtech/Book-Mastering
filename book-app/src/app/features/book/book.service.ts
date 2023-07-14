import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
class Book {
  constructor(
      readonly title: string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

pathAPI = "https://localhost:44394/api/ChapGPTService/GetTitles";
list: any | undefined ;
constructor( private http: HttpClient ) {
}
  getTitles (question: any): Observable<any> {
   
    let queryParams = new HttpParams();
    queryParams = queryParams.append("question",question);
    return this.http.get(this.pathAPI,{params:queryParams,responseType: 'text'})
     
    
  }
}

