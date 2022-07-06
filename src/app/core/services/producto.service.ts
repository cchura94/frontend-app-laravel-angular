import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  urlBase = environment.servidor
  constructor(private http: HttpClient) { }

  indexProducto(page=10){
    return this.http.get(`${this.urlBase}/producto?page=${page}`);
  }

  storeProducto(datos: any){
    return this.http.post(`${this.urlBase}/producto`, datos);
  }

  updateProducto(datos, id){
    return this.http.put(`${this.urlBase}/producto/${id}`, datos);
  }

  showProducto(id){
    return this.http.get(`${this.urlBase}/producto/${id}`);
  }

  destroyProducto(id){
    return this.http.delete(`${this.urlBase}/producto/${id}`);
  }

}
