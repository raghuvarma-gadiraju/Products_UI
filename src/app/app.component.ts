import { Component } from '@angular/core';
import {ProductListComponent} from './products/product-list.component'

@Component({
  selector: 'pm-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
    <a class='navbar-brand'>{{title}}</a>
  <ul class='nav nav-pills'>
    <li><a class='nav-link' routerLink="/products">Home</a></li>
    <li><a class='nav-link' routerLink="/products">Product List</a></li>
  </ul>
  </nav>
  <router-outlet></router-outlet>
  
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Products';
}
