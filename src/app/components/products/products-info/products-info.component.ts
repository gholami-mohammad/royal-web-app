import { Component, Input } from '@angular/core';
import { Product } from '../../../models/product';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products-info',
  imports: [NgIf, NgFor],
  templateUrl: './products-info.component.html',
  styleUrl: './products-info.component.scss',
})
export class ProductsInfoComponent {
  @Input() product?: Product;
}
