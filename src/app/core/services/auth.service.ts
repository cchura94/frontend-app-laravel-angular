import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  urlBase = environment.servidor
  constructor(private http: HttpClient) { }

  loginConLaravel(datos:any){    
    return this.http.post(`${this.urlBase}/v1/auth/login`, datos)
  }

}
