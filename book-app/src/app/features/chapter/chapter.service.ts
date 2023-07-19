import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateChapter } from './models/CreateChapter';
import { ListChapter } from './models/ListChapter';
import { SuggetionsChapterContent } from './models/SuggetionsChapterContent';
import { EditChapter } from './models/EditChapter';
@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  deleteChapter(id: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",id);
    return this.http.delete(`${this.pathAPI}BookChaptersModel`,{params:queryParams})
  }
  editChapter(editChapter: EditChapter): Observable<EditChapter> {
    return this.http.put<EditChapter>(`${this.pathAPI}BookChaptersModel`,editChapter)
  }
  
  getChapterById(chapterId?:number): Observable<EditChapter> {
    return this.http.get<EditChapter>(`${this.pathAPI}BookChaptersModel/${chapterId}`)
  }


  createChapter(createChapter: CreateChapter): Observable<CreateChapter> {
    return this.http.post<CreateChapter>(`${this.pathAPI}BookChaptersModel`,createChapter)
  }

  getChapters(): Observable<ListChapter[]> {
    return this.http.get<ListChapter[]>(`${this.pathAPI}BookChaptersModel`)
  }

pathAPI = "https://localhost:44394/api/";
constructor( private http: HttpClient ) {
}
  getContent (question: any): Observable<any> {
   
    let queryParams = new HttpParams();
    queryParams = queryParams.append("question",question);
    return this.http.get<SuggetionsChapterContent[]>(`${this.pathAPI}ChapGPTService/GetChapters`,{params:queryParams})
     
    
  }
}

