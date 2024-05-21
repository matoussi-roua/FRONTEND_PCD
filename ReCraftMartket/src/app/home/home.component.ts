import { Component } from '@angular/core';
import { ShoppinglistService } from '../services/shoppinglist.service';
import { Product } from '../models/product/product';
import { HttpClient } from '@angular/common/http';
import { FileProductService } from '../services/files/file-product.service';
import { ProductService } from '../services/product/product.service';
import { DataService } from '../recsys/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  productsList: Product[] = [];
  data:any;
  constructor(private httpclient: HttpClient,private productService:ProductService,private dataService :DataService) {}

  ngOnInit() {
this.dataService.fetchDataFromFlaskApi().subscribe((r:any)=>{
console.log(r);
});
    this.productService.getAllProducts().subscribe((r)=>{
      console.log(r);
      this.productsList=r;
    })
    //this.fetchProducts();
    console.log();
  }

  // fetchProducts() {
  //   this.httpclient.get<Product[]>("https://fakestoreapi.com/products").subscribe(
  //     (data: Product[]) => {
  //       console.log(data);
  //       this.productsList = data;
  //     },
  //     (error) => {
  //       console.error("Error fetching products:", error);
  //     }
  //   );
  // }
}