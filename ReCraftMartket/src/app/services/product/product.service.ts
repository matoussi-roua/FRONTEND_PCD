import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/v2/users';

  constructor(private http: HttpClient) { }

  // Add product to user
  addProductToUser(id: string, product: any): Observable<any> {
    return this.http.put(this.baseUrl+"/client/addproductuser/"+id, product);
  }

  // Add image to product
  addImageToProductUser(iduser: string, idproduct: number, image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', image, image.name);
    return this.http.put(`${this.baseUrl}/client/addimageproduct/${iduser}/${idproduct}`, formData);
  }

  // Update product of user
  updateProductUser(iduser: string, idproduct: number, productupdated: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/updateproductuser/${iduser}/${idproduct}`, productupdated);
  }

  // Delete product from user
  deleteProductFromUser(iduser: string, idproduct: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/client/deleteproductuser/${iduser}/${idproduct}`);
  }
//get all products
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/v3/products/permit/allproducts`);
  }
  // Get all products of user
  getAllProductsOfUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/permit/allproductsuser/${id}`);
  }
  getAllLikesListOfUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/alllikeslistuser/${id}`);
  }

  addProductToLikesListUser(iduser: string, idproduct: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/addtolikeslistuser/${iduser}/${idproduct}`, {});
  }

  deleteFromLikesListUser(iduser: string, idproduct: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/client/deletefromlikeslistuser/${iduser}/${idproduct}`);
  }

  // Favourite List

  getAllFavouriteListOfUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/allfavouritelistuser/${id}`);
  }

  addProductToFavouriteListUser(iduser: string, idproduct: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/addtofavouritelistuser/${iduser}/${idproduct}`, {});
  }

  deleteFromFavouriteListUser(iduser: string, idproduct: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/client/deletefromfavouritelistuser/${iduser}/${idproduct}`);
  }

  // Comments

  getAllCommentsProduct(idproduct: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/permit/getallcommentsproduct/${idproduct}`);
  }

  addCommentToProduct(iduser: string, idproduct: number, comment: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/addcommenttoproduct/${iduser}/${idproduct}`, comment);
  }

  deleteCommentFromProduct(iduser: string, idproduct: number, idcomment: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/client/deletecommentfromproduct/${iduser}/${idproduct}/${idcomment}`);
  }

  // Change Status

  changeStatus(iduser: string, idproduct: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/changestatus/${iduser}/${idproduct}`, {});
  }

  // Leaderboard

  getLeaderBoard(iduser: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/permit/leaderboard/${iduser}`);
  }

  // Shop Points

  shopnow(iduser: string, idproduct: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/shopnow/${iduser}/${idproduct}`, {});
  }

  // User Authorized

  getUserById(iduser: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/client/userauthorized/${iduser}`);
  }
}