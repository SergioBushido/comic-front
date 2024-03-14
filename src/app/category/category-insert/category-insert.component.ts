import { Router } from '@angular/router';
import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-category-insert',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './category-insert.component.html',
  styleUrl: './category-insert.component.css'
})
export class CategoryInsertComponent implements OnInit {
  insertForm!: FormGroup;
  name!: FormControl;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  onSubmit() {
    let newCategory = this.insertForm.value;
    console.log(newCategory);
    this.categoryService.insertCategory(newCategory).subscribe({
      next: (category: Category) => {
        console.log('New Category Posted.');
        console.log(category);
        this.categoryService.clearCache();
        this.router.navigateByUrl('/categories');
      },
      error: (error: any) => {
        console.log('Could not post category. ' + error),
          () => console.log('New Category Post Complete.');
      },
    });
  }

  ngOnInit() {
    this.name = new FormControl('', [Validators.required]);
  
    this.insertForm = this.fb.group({
      name: this.name
    });
  }
}
