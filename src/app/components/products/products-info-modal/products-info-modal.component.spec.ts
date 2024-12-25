import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsInfoModalComponent } from './products-info-modal.component';

describe('ProductsInfoModalComponent', () => {
  let component: ProductsInfoModalComponent;
  let fixture: ComponentFixture<ProductsInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsInfoModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
