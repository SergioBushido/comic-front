import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, mergeMap } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl: string = 'http://localhost:8080/api/v1';
  private product = 'product';
  private http: HttpClient = inject(HttpClient);
  products$!: Observable<Product[]>;

  constructor() {
    this.initProducts();
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.product}/${id}`);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    console.log('servicio: ', newProduct);
    return this.http.post<Product>(`${this.baseUrl}/${this.product}`, newProduct);
  }

  getProductById(id: number): Observable<Product> {
    return this.products$.pipe(
      mergeMap((products) => products),
      first((product) => product.id == id)
    );
  }

  initProducts() {
    let url: string = `${this.baseUrl}/products`;

    this.products$ = this.http.get<Product[]>(url);
      
    this.products$.subscribe(product => console.log('Products: ', product)) ;
      
  }

  clearCache() {
    this.initProducts();
  }
}
