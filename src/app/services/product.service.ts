import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

interface PaginatedResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host = "http://localhost:8077/products";

  constructor(private http: HttpClient) { }

  public getProducts(keyword: string = "", page: number = 1, size: number = 4) {
    return this.http.get<PaginatedResponse>(this.host +"?name="+keyword+"&_page="+page+"&_per_page="+size)
  }

  public getProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(this.host + "/" + productId);
  }

  public updateProductByCheck(product: Product) {
    return  this.http.patch(this.host + "/" + product.id,
                            {checked: !product.checked});
  }

  public deleteProduct(product: Product) {
    return  this.http.delete(this.host + "/" + product.id);
  }

  public saveProduct(product: Product) {
    return  this.http.post(this.host, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.host + "/" + product.id, product);
  }
}
