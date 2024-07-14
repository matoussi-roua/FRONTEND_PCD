import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileProductService {

  private baseUrl = 'http://localhost:8080/api/v3/products';
  constructor(private http:HttpClient) { }
  fetchImageFromProduct(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/permit/imageproduct/${id}`, { responseType: 'blob' });
  }
}
