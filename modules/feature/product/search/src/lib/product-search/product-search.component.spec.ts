import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ProductSearchComponent } from './product-search.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  mockProducts,
  ProductSearchService,
} from '@ecommerce-joi/product-data-access';
import { of } from 'rxjs';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let productSearchService: ProductSearchService;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSearchComponent, NoopAnimationsModule],
      providers: [
        {
          provide: ProductSearchService,
          useValue: { searchByName: () => of(mockProducts) },
        },
      ],
    }).compileComponents();
    productSearchService = TestBed.inject(ProductSearchService);
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    jest.spyOn(productSearchService, 'searchByName');
    fixture.detectChanges();
    input = fixture.nativeElement.querySelector('input');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should debounce when input field is changed', fakeAsync(() => {
    input.value = 'notebook';
    input.dispatchEvent(new Event('input'));

    expect(productSearchService.searchByName).not.toHaveBeenCalled();
    tick(300);

    expect(productSearchService.searchByName).toHaveBeenCalledWith(input.value);
  }));
  it('should search multiple times', fakeAsync(() => {
    input.value = 'note';
    input.dispatchEvent(new Event('input'));

    tick(300);

    input.value = 'notebook';
    input.dispatchEvent(new Event('input'));

    tick(300);

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(2);
  }));
  it('should prevent identical submissions', fakeAsync(() => {
    input.value = 'note';
    input.dispatchEvent(new Event('input'));

    tick(300);

    input.value = 'note';
    input.dispatchEvent(new Event('input'));

    tick(300);

    expect(productSearchService.searchByName).toHaveBeenCalledTimes(1);
  }));
  it('should prevent empty submissions', fakeAsync(() => {
    input.value = '';
    input.dispatchEvent(new Event('input'));

    tick(300);

    expect(productSearchService.searchByName).not.toHaveBeenCalled();
  }));
  it('should return products observable correctly', () => {
    component.products$.subscribe((products) => {
      expect(products).toEqual(mockProducts);
    });
  });
});
