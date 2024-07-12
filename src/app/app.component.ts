import { LayoutModule } from '@ecommerce-joi/layout';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { ProductSearchComponent } from '@ecommerce-joi/product-search';

@Component({
  standalone: true,
  imports: [
    NxWelcomeComponent,
    RouterModule,
    LayoutModule,
    ProductSearchComponent,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ecommerce-joi';
}
