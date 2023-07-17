import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSection } from './models/CreateSection';
import { ListSection } from './models/ListSection';
import { SuggetionsSectionContent } from './models/SuggetionsSectionContent';
@Injectable({
  providedIn: 'root'
})
export class SectionService {
  createSection(createSection: CreateSection): Observable<CreateSection> {
    return this.http.post<CreateSection>(`${this.pathAPI}SectionModel`,createSection)
  }

  getSections(): Observable<ListSection[]> {
    return this.http.get<ListSection[]>(`${this.pathAPI}SectionModel`)
  }

pathAPI = "https://localhost:44394/api/";
constructor( private http: HttpClient ) {
}
  getTitles (question: any): Observable<any> {
   
    let queryParams = new HttpParams();
    queryParams = queryParams.append("question",question);
    return this.http.get<SuggetionsSectionContent[]>(`${this.pathAPI}ChapGPTService/GetTitles`,{params:queryParams})
     
    
  }
}

