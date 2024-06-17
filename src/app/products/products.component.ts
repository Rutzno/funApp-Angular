import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  constructor(private productService: ProductService, public appState: AppStateService, private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    /*this.appState.setProductState({
      status: "LOADING"
    })*/
      this.productService.getProducts(this.appState.productsState.keyword, this.appState.productsState.currentPage,
        this.appState.productsState.pageSize)
      .subscribe({
        next: response => {
          this.appState.setProductState({
            products: response.data,
            totalProducts: response.items,
            totalPages: response.pages,
            status: "LOADED"
          });
        },
        error: err => {
          this.appState.setProductState({
            status: "ERROR",
            errorMessage: err
          })
        }
      });
  }

  handleDelete(product: Product) {
    if (confirm("Etes vous sùr ?"))
    this.productService.deleteProduct(product)
            .subscribe({
              next: data => {
                // this.appState.productsState.products = this.appState.productsState.products.filter((p: any) => p.id != product.id)
                this.getProducts()
              },
              error: err => {

              }
            });
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl("admin/editProduct/" + product.id);
  }

  handleCheckProduct(product: Product) {
      this.productService.updateProductByCheck(product)
      .subscribe({
        next: updatedProduct => {
          product.checked = !product.checked;
        }
      })

  }

  handleGotoPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.getProducts();
  }


}
