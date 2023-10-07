import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/constants/constant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  baseUrl = environment.backendUrl;

  constructor(private http: HttpClient) { }

  private getToken(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  addArticle(payload: Article) : Observable<any> {
    const headers = this.getToken();
    const options = { headers: headers };
    const result = this.http.post(`${this.baseUrl}/articles/create`, payload, options);
    return result;
  }

  getAllArticle() : Observable<any> {
    const headers = this.getToken();
    const options = { headers: headers };
    const result = this.http.get(`${this.baseUrl}/articles/getAll`, options);
    return result;
  }

  deleteArticle(articleId: string) {
    const headers = this.getToken();
    const options = { headers: headers };
    const result = this.http.delete(`${this.baseUrl}/articles/deleteById/${articleId}`, options);
    return result;
  }
}
