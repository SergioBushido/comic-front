import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-insert',
  templateUrl: './category-insert.component.html',
  styleUrls: ['./category-insert.component.css']
})
export class CategoryEditComponent implements OnInit {
  editForm: FormGroup;
  categoryId: number;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.categoryId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (category) => {
        this.editForm.patchValue(category);
      },
      error: (error) => {
        console.error('Error fetching category', error);
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      this.categoryService.updateCategory(this.categoryId, this.editForm.value).subscribe({
        next: () => {
          this.router.navigate(['/categories']);
        },
        error: (error) => {
          console.error('Error updating category', error);
        }
      });
    }
  }
}