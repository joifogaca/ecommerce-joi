import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { mockProducts } from '@ecommerce-joi/product-data-access';

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
export class ProductSearchComponent {
  control = new FormControl('');
  products = mockProducts;
}
