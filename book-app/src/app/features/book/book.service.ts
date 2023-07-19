import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateBook } from './models/CreateBook';
import { SuggetionsTitleBook } from './models/SuggetionsTitleBook';
import { ListBook } from './models/ListBook';
import { EditBook } from './models/EditBook';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  editBook(editBook: EditBook): Observable<EditBook> {
    return this.http.put<EditBook>(`${this.pathAPI}BookModel`,editBook)
  }
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.pathAPI}BookModel/${id}`)
  }
  createBook(createBook: CreateBook): Observable<CreateBook> {
    return this.http.post<CreateBook>(`${this.pathAPI}BookModel`,createBook)
  }

  getBooks(): Observable<ListBook[]> {
    return this.http.get<ListBook[]>(`${this.pathAPI}BookModel`)
  }
  getBookById(bookId?:number): Observable<EditBook> {
    return this.http.get<EditBook>(`${this.pathAPI}BookModel/${bookId}`)
  }

pathAPI = "https://localhost:44394/api/";
constructor( private http: HttpClient ) {
}
  getTitles (question: any): Observable<any> {
   
    let queryParams = new HttpParams();
    queryParams = queryParams.append("question",question);
    return this.http.get<SuggetionsTitleBook[]>(`${this.pathAPI}ChatGPTService/GetTitles`,{params:queryParams})
     
    
  }
}

