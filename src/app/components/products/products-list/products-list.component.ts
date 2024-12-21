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

  constructor(
    private productService: ProductService,
    private notif: NotifService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    // load products
    this.productService.list().subscribe({
      next: (res) => {
        this.productsResult = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.notif.error('failed to load products');
      },
    });
  }
}
