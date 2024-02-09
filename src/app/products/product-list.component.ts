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
  finalPrice: string = '';
  showProducts: boolean = false;
  constructor(private productService : ProductService){
  }
  products: IProduct[] = []
  filteredProducts : IProduct[] = [];
  productCategory = ['Bat','Gloves','pads','Gaurds','Helmet'];

  ngOnInit(): void {   
    this.productService.getProducts().subscribe({
      next: products => {this.products = products;
        this.filteredProducts = this.products;
       
      },
      error: err => this.errorMessage = err
    });
   
    
  }



  get listFilter() : string {
    return this._listFilter;
  }

  set listFilter(value: string){
    this._listFilter = value;
    this.searchProducts(value,document.getElementById('pcdropdown'))
  }


  searchProductsTable(dropdown: any) : IProduct[] {
    let e = dropdown.value;
    return this.products.filter(
      (product: IProduct) => product.category.includes(e)
    )
  }

  filterTable(){
    this.filteredProducts = this.searchProductsTable(document.getElementById("pcdropdown"));
  }

  

  searchProducts (value: string, dropdown: any) : void {
    value = value.toLocaleUpperCase();
    let dropdown_items = dropdown.querySelectorAll('.clist');
    for (let i=0; i<dropdown_items.length; i++) {
        if (dropdown_items[i].innerHTML.toUpperCase().includes(value))
            dropdown_items[i].style.display = 'block';
        else
            dropdown_items[i].style.display = 'none';
    }
  }


  toggleImage() {
    this.showImage = !this.showImage   
  }
  
  toggleProducts() {
  this.showProducts = !this.showProducts;

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






  


 


