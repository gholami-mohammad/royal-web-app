import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { LoadingComponent } from '../../loading/loading.component';
import { ProductsResponse } from '../../../models/product';
import { NgFor, NgIf } from '@angular/common';
import { NotifService } from '../../../services/notif.service';

@Component({
  selector: 'app-products-list',
  imports: [LoadingComponent, NgIf, NgFor],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent implements OnInit {
  loading = true;
  productsResult?: ProductsResponse;
  totalPages = 0;
  pagesTemp: Array<number> = [];
  currentPage = 1;
  limit: number = 10;

  constructor(
    private productService: ProductService,
    private notif: NotifService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.pagesTemp = [];
    // load products
    this.productService
      .list({ limit: this.limit, page: this.currentPage })
      .subscribe({
        next: (res) => {
          this.productsResult = res;

          this.totalPages = Math.ceil(res.total / this.limit);
          for (let i = 1; i <= this.totalPages; i++) {
            this.pagesTemp.push(i);
          }

          this.currentPage = res.skip / this.limit + 1;

          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.notif.error('failed to load products');
        },
      });
  }

  gotoPage(pageNumber: number = 1) {
    this.currentPage = pageNumber;
    this.loadProducts();
  }
}
