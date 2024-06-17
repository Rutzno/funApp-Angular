import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId!: number;
  productFormGroup!: FormGroup;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params["id"];
    this.productService.getProductById(this.productId)
      .subscribe({
        next: product => {
          this.productFormGroup = this.fb.group({
            id: this.fb.control(product.id),
            name: this.fb.control(product.name, [Validators.required]),
            price: this.fb.control(product.price),
            checked: this.fb.control(product.checked)
          });
        }
      })
  }

  updateProduct() {
    let product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: product => {
        alert(JSON.stringify(product));
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
