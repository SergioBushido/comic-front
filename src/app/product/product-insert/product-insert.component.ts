import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-insert',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './product-insert.component.html',
  styleUrl: './product-insert.component.css'
})
export class ProductInsertComponent implements OnInit {
  insertForm!: FormGroup;
  name!: FormControl;
  price!: FormControl;
  description!: FormControl;
  offer!: FormControl;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  onSubmit() {
    let newProduct = this.insertForm.value;
    console.log('formulario:',newProduct);
    this.productService.insertProduct(newProduct).subscribe({
      next: (product: Product) => {
        console.log('New Product Posted.');
        console.log(product);
        this.productService.clearCache();
        this.router.navigateByUrl('/products');
      },
      error: (error: any) => {
        console.log('Could not post product. ' + error),
          () => console.log('New Product Post Complete.');
      },
    });
  }

  ngOnInit() {
    this.name = new FormControl('', [Validators.required]);
    this.price = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(50),
    ]);
    this.insertForm = this.fb.group({
      name: this.name,
      price: this.price,
      description: this.description,
      offer: false,
    });
  }
}
