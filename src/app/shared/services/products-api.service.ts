import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../app-config/app-config.token';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsApiService {
  http = inject(HttpClient);
  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}
  loadProducts(
    page: number,
    limit: number,
    filter: string
  ): Observable<Product[]> {
    let params = new HttpParams();
    params = params.append('_page', page.toString());
    params = params.append('_limit', limit.toString());

    if (filter) {
      params = params.append('name_like', filter); // Example filtering by name
    }
    return this.http.get<Product[]>(`${this.appConfig.baseURL}/products`, {
      params,
    });
  }
}
