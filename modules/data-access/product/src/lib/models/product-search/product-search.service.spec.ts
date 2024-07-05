import { mockProducts } from './../../mocks/product.mock';
import { Product } from './../product.model';
import { TestBed } from '@angular/core/testing';

import { ProductSearchService } from './product-search.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('ProductSearchService', () => {
  let service: ProductSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products correctly', () => {
    const mockName = 'notebook';
    const url = `${service.apiUrl}/products?name=${mockName}`;
    let result: Product[] = [];

    service.searchByName(mockName).subscribe((products) => (result = products));

    const request = httpMock.expectOne(url);
    request.flush(mockProducts);
    expect(request.request.method).toBe('GET');
    expect(result).toEqual(mockProducts);
  });
});
