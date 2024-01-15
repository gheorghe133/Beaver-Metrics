import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://fire-beaver-bot-api.vercel.app/api';

  constructor(private http: HttpClient) {}

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAllUsers`);
  }

  getUserData(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getUser/${name}`);
  }
}
