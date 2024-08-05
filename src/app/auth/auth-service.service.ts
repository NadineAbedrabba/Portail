import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl: string="http://localhost:5071/api/User/"
  constructor(private http : HttpClient) { }
  signUp(userObj: any){
    return this.http.post<any>(`${this.baseUrl}Register`,userObj);
  }
  // signUp(signUpData: { nom: string, prenom: string, password: string }): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/Register`, signUpData);}
  login(loginObj: any){
    return this.http.post<any>(`${this.baseUrl}authenticate`,loginObj);
  }
  getNewMatricule(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}generate-matricule`, {});
  }
 
}
