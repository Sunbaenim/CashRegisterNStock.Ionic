import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CategoryIndexModel } from './../models/category/category-index.model';
import { Observable } from 'rxjs';
import { filter, map, switchMap, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string = environment.apiUrl + 'category/';

  constructor(
    private client: HttpClient
  ) { }

  getCategoriesWithProducts(categoriesWithoutProducts: boolean = false): Observable<CategoryIndexModel[]> {
    if (categoriesWithoutProducts) {
      return this.client.get<CategoryIndexModel[]>(this.categoryUrl);
    }
    return this.client.get<CategoryIndexModel[]>(this.categoryUrl)
    .pipe(map(cat => cat.filter(c => c.products.length > 0)));
  }
}
