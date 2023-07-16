import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateChapter } from './models/CreateChapter';
import { ListChapter } from './models/ListChapter';
import { SuggetionsChapterContent } from './models/SuggetionsChapterContent';
@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  createChapter(createChapter: CreateChapter): Observable<CreateChapter> {
    return this.http.post<CreateChapter>(`${this.pathAPI}ChapterModel`,createChapter)
  }

  getChapters(): Observable<ListChapter[]> {
    return this.http.get<ListChapter[]>(`${this.pathAPI}ChapterModel`)
  }

pathAPI = "https://localhost:44394/api/";
constructor( private http: HttpClient ) {
}
  getTitles (question: any): Observable<any> {
   
    let queryParams = new HttpParams();
    queryParams = queryParams.append("question",question);
    return this.http.get<SuggetionsChapterContent[]>(`${this.pathAPI}ChapGPTService/GetTitles`,{params:queryParams})
     
    
  }
}

