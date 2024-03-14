import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { Category } from '../../models/category.interface';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css'
})
export class CategoryDetailComponent {
  @Input() category!: Category;
  @Output() favouriteAdded = new EventEmitter<Category>()

  private categoryService = inject(CategoryService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  category$!: Observable<Category>


  deleteCategory(id: number) {
    this.categoryService
        .deleteCategory(id)
        .subscribe({
           next: () => {
                console.log('Category deleted.');
                this.categoryService.clearCache();
                this.router.navigateByUrl("/categories");
            },
           error: e => console.log('Could not delete category. ' + e.message)
          }
        );
  }

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    if (id) {
        this.category$ = this.categoryService.getCategoryById(id);
    }
  }
}
