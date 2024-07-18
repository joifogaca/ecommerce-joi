import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ProductSearchService } from '@ecommerce-joi/product-data-access';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { mockProducts } from '@ecommerce-joi/product-data-access';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { Product } from 'modules/data-access/product/src/lib/model/product.model';

@Component({
  selector: 'lib-product-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss',
})
export class ProductSearchComponent implements OnInit {
  control = new FormControl('', {
    nonNullable: true,
  });
  products$!: Observable<Product[]>;

  constructor(private productSearchService: ProductSearchService) {}

  ngOnInit(): void {
    this.products$ = this.control.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((text) => text.length > 0),
      switchMap((value) => this.productSearchService.searchByName(value))
    );
  }
}
