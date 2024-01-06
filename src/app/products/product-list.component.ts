import { Component, OnInit, Input } from '@angular/core';
import {IProduct} from './product'
import {ConvertToSpacePipe} from '../shared/convert-to-space.pipe'
import {FormsModule} from '@angular/forms'
import {StarComponent} from '../shared/star.component'
import {ProductService} from './product.service'

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  pageTitle: string = 'Products';
  showImage: boolean = false;
  imageWidth: Number = 40;
  imageMargin: Number = 2;
  private _listFilter : string = '';
  errorMessage: string = '';
  constructor(private productService : ProductService){

  }
  products: IProduct[] = []
  filteredProducts : IProduct[] = [];

  get listFilter() : string {
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value
    this.filteredProducts = this.performFilter(value)
  }

  performFilter(value: string) : IProduct[] {
    value = value.toLocaleLowerCase();
    return this.products.filter(
      (product: IProduct) => product.productName.toLocaleLowerCase().includes(value)
    )
  }

  toggleImage() {
    this.showImage = !this.showImage   
  }

  ngOnInit(): void {   
    this.productService.getProducts().subscribe({
      next: products => {this.products = products;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
    
  }

 onRatingClicked(message: string){
      this.pageTitle = "Rating" + message;

 }



}
