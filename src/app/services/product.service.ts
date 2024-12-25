import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Product, ProductsResponse } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  list({ limit = 10, page = 1 }) {
    let skip = (page - 1) * limit;
    if (skip < 0 || limit < 0) {
      skip = 0;
      limit = 10;
    }

    const target = environment.baseURL + '/products';
    let params = new HttpParams()
      .append('limit', limit)
      .append('skip', skip)
      .append('select', 'id,title,category,price');

    return this.http.get<ProductsResponse>(target, {
      params: params,
    });
  }

  get(id: number) {
    const target = `${environment.baseURL}/products/${id}`;
    return this.http.get<Product>(target);
  }
}
