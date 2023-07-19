import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSection } from './models/CreateSection';
import { ListSection } from './models/ListSection';
import { SuggetionsSectionContent } from './models/SuggetionsSectionContent';
import { EditSection } from './models/EditSection';
@Injectable({
  providedIn: 'root'
})
export class SectionService {
  deleteChapter(id: number): Observable<any> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id",id);
    return this.http.delete(`${this.pathAPI}BookSectionsModel`,{params:queryParams})
  }

  editSection(editSection: EditSection): Observable<EditSection> {
    return this.http.put<EditSection>(`${this.pathAPI}BookSectionsModel`,editSection)
  }

  createSection(createSection: CreateSection): Observable<CreateSection> {
    return this.http.post<CreateSection>(`${this.pathAPI}BookSectionsModel`,createSection)
  }

  getSections(): Observable<ListSection[]> {
    return this.http.get<ListSection[]>(`${this.pathAPI}BookSectionsModel`)
  }

  getSectionById(bookId?:number): Observable<EditSection> {
    return this.http.get<EditSection>(`${this.pathAPI}BookSectionsModel/${bookId}`)
  }


pathAPI = "https://localhost:44394/api/";
constructor( private http: HttpClient ) {
}
  getTitles (question: any): Observable<any> {
   
    let queryParams = new HttpParams();
    queryParams = queryParams.append("question",question);
    return this.http.get<SuggetionsSectionContent[]>(`${this.pathAPI}ChatGPTService/GetSectionsSections`,{params:queryParams})
     
    
  }
}

