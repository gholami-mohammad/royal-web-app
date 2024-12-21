export class ProductSummary {
  id!: number;
  title!: string;
  category!: string;
  price!: number;
}

export class ProductsResponse {
  products!: ProductSummary[];
  total!: number;
  skip!: number;
  limit!: number;
}
