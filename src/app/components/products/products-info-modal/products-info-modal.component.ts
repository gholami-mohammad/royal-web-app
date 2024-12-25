import { Component, Input } from '@angular/core';
import { Product, ProductSummary } from '../../../models/product';
import { JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { NotifService } from '../../../services/notif.service';
import { LoadingComponent } from '../../loading/loading.component';
import { ProductsInfoComponent } from '../products-info/products-info.component';

@Component({
  selector: 'app-products-info-modal',
  imports: [NgStyle, NgIf, LoadingComponent, NgFor, ProductsInfoComponent],
  templateUrl: './products-info-modal.component.html',
  styleUrl: './products-info-modal.component.scss',
})
export class ProductsInfoModalComponent {
  _product: Product | undefined;
  loading = true;

  constructor(
    private productService: ProductService,
    private notifService: NotifService
  ) {}

  @Input() set product(p: ProductSummary | undefined) {
    if (p == undefined) {
      this._product = undefined;
      this.loading = false;

      return;
    }

    this.loading = true;
    this.productService.get(p.id).subscribe({
      next: (product) => {
        this._product = product;
        this.loading = false;
      },
      error: (err) => {
        this.notifService.error('failed to get product details');
        this._product = undefined;
        this.loading = false;
      },
    });
  }

  get product(): Product | undefined {
    return this._product;
  }

  closeModal() {
    this.product = undefined;
  }
}
