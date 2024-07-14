import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FileUserService {
  private baseUrl = 'http://localhost:8080/api/v2/users';
  constructor(private http:HttpClient) { }

  addImageToUser(id: string, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(`${this.baseUrl}/client/addimagetouser/${id}`, formData);
  }



  // Remove image from user
  removeImageFromUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/client/removeimage/${id}`);
  }

  fetchImageFromUser(id: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/permit/imageuser/${id}`, { responseType: 'blob' });
  }
  
}