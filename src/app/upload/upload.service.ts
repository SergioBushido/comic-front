import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl: string = 'http://localhost:8080/api/v1';
  private upload = 'upload';
  private http: HttpClient = inject(HttpClient);


  uploadFile(file: any): any {
    return this.http.post<any>(`${this.baseUrl}/${this.upload}`, file);
  }

}

