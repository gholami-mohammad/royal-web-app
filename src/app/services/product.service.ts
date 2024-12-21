import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductsResponse } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  list() {
    const target = environment.baseURL + '/products';
    let params = new HttpParams()
      .append('limit', 10)
      .append('skip', 0)
      .append('select', 'id,title,category,price');

    return this.http.get<ProductsResponse>(target, {
      params: params,
    });
  }
}
