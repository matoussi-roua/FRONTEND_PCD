import { Component } from '@angular/core';
import { Product } from '../models/product/product';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product/product.service';
import { DataService } from '../recsys/data.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileProductService } from '../services/files/file-product.service';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  existedimage: boolean = true;
  productsList: Product[] = [];
  data: any;
  imageData!: SafeUrl;

  imageUrls: string[] = [
    'assets/images/home/DIY Embroidery Kit.jpg',
    'assets/images/home/DIY Natural Soap Making Kit.jpg',
    'assets/images/home/DIY Succulent Terrarium Kit.jpg',
    'assets/images/home/DIY Terrarium Kit.jpg',
    'assets/images/home/Handmade Wooden Shelf.jpg',
    'assets/images/home/kit.jpg',
    'assets/images/home/soap.jpg',
    'assets/images/home/wood.jpg',
    'assets/images/img1.png'
    // Add more URLs as needed
  ];
  constructor(
    private httpclient: HttpClient,
    private productService: ProductService,
    private dataService: DataService,
    private fileProductService: FileProductService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    // this.dataService.fetchDataFromFlaskApi().subscribe((r:any)=>{
    //console.log(r);
    //});
    this.productService.getAllProducts().subscribe((r) => {
      console.log(r);
      this.productsList = r;
    });
    console.log();
  }
  imageUrl(idproduct: number) {
    this.fetchImageProduct(idproduct);
    return this.imageData;
  }

  
  fetchImageProduct(idproduct: number) {
    this.fileProductService.fetchImageFromProduct(idproduct).subscribe(
      (response) => {
        console.log(response);
        return this.sanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(response)
        );
      },
      (error) => {
        console.error('Error fetching image data:', error);
        this.existedimage = false;
        // Handle the error here, such as displaying an error message
      }
    );
  }
  getRandomUrl(): string {
    // Generate a random index to select a URL from the list
    const randomIndex = Math.floor(Math.random() * this.imageUrls.length);
    return this.imageUrls[randomIndex];
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
