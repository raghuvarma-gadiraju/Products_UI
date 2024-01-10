import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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
  finalPrice: string = ''
  @ViewChild('myDiv') myDiv!: ElementRef;
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


 addToCart(): string {
  let price = [];
  let row= []
  let tbl1 = document.getElementById('productsTable')!;
  var checkBoxes = tbl1.getElementsByTagName("input");
  for (var i = 0; i < checkBoxes.length; i++) {
    if (checkBoxes[i].checked) {
      row[i] = document.getElementsByTagName('tr')[i];
      price.push(row[i].cells[4].innerText);
      
    } 
  }

  price = price.map((x)=> parseInt(x));

  //find max value and apply discount
  let max = Math.max.apply(null,price);

  if (price.length >=3) {
  for (var i = 0; i<=price.length;i++){
    if (price[i]==max){
        price.splice(i,1)
    }
  }
 
  let discountedPrice = max*0.8;
  price.push(discountedPrice)
}
  
  let sum=0;
  for (var k = 0; k< price.length; k++){
    sum += price[k];
  }

  this.finalPrice = '';
  return this.finalPrice = this.finalPrice + 'Total Price: ' + sum;
  
  
}
  
  


 

}
