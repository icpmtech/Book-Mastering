import { HttpClient } from '@angular/common/http';
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

pathAPI = "https://localhost:44394/api/BookModel";
list: any[] | undefined ;
constructor( private http: HttpClient ) {
}
  getTitles (body: any): any {
   
    this.http.get(this.pathAPI)
    .toPromise()
    .then(res => {
      debugger;
      this.list = res as any[];
    });
     
    
  }
}

