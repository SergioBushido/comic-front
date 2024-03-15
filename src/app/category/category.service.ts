import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first, mergeMap } from 'rxjs';
import { Category } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = 'http://localhost:8080/api/v1';
  private category = 'category';
  private http: HttpClient = inject(HttpClient);
  categories$!: Observable<Category[]>;

  constructor() {
    this.initCategories();
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${this.category}/${id}`);
  }

  insertCategory(newCategory: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/${this.category}`, newCategory);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.categories$.pipe(
      mergeMap((categories) => categories),
      first((category) => category.id == id)
    );
  }

  // intentando actualizar
  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${this.category}/${id}`, category);
  }

  initCategories() {
    let url: string = `${this.baseUrl}/categories`;

    this.categories$ = this.http.get<Category[]>(url);
      
    this.categories$.subscribe(category => console.log('Categories: ', category)) ;
      
  }

  clearCache() {
    this.initCategories();
  }
}

