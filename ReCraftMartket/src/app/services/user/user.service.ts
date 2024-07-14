import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserEntity } from '../../models/user/user_entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/v2/users';

  constructor(private http: HttpClient) { }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/permit/user/${username}`);
  }

  updateUser(id: string, user: UserEntity): Observable<any> {
    return this.http.put(`${this.baseUrl}/client/updateuser/${id}`, user);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/permit/allusers`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/permit/userbyid/${id}`);
  }
  getUserAuthorisedById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/client/userauthorized/${id}`);
  }
  //   @GetMapping(value = "/client/userauthorized/{iduser}")
  // public ResponseEntity<Object> getUserById(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("iduser") UUID iduser){
  //        return userService.getUserByIdAuthorized(userDetails,iduser);
  // }

  //the laederboard part:
  // @GetMapping(value = "/permit/leaderboard/{iduser}")
  // public ResponseEntity<Object> getLeaderBoard(@PathVariable("iduser") UUID iduser) throws IOException{
  //     return userService.getLeaderBoard(iduser);
  // }
  getLeaderBoard(id: string): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/permit/leaderboard/${id}`);
  }
}