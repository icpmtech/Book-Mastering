import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBook } from './create-book/models/CreateBook';
import { SuggetionsTitleBook } from './create-book/models/SuggetionsTitleBook';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  createBook(createBook: CreateBook): Observable<CreateBook> {
    return this.http.post<CreateBook>(`${this.pathAPI}BookModel`,createBook)
  }

pathAPI = "https://localhost:44394/api/";
constructor( private http: HttpClient ) {
}
  getTitles (question: any): Observable<any> {
   
    let queryParams = new HttpParams();
    queryParams = queryParams.append("question",question);
    return this.http.get<SuggetionsTitleBook[]>(`${this.pathAPI}ChapGPTService/GetTitles`,{params:queryParams})
     
    
  }
}

