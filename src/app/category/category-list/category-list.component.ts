import { Component, Signal, inject, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { Category } from '../../models/category.interface'
import { CategoryService } from '../category.service'
import { OrderBy } from '../../utils/orderBy.pipe'

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderBy],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategorytListComponent {

  private categoryService = inject(CategoryService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  title = "Categories"
  categories: Signal<Category[]> = toSignal(this.categoryService.categories$, {initialValue: []})
  categoriesNumber: Signal<number> = computed(() => this.categories().length)
  hasCategories: Signal<boolean> = computed(() => this.categoriesNumber() > 0)

  selectedCategory!: Category
  sorter = "-date"
  errorMessage!: string

  pageSize: number = 5
  start: number = 0
  end: number = this.pageSize
  currentPage: number = 1

  firstPage(): void {
      this.start = 0
      this.end = this.pageSize
      this.currentPage = 1
  }

  nextPage(): void {
      this.start += this.pageSize
      this.end += this.pageSize
      this.currentPage++
  }

  previousPage(): void {
      this.start -= this.pageSize
      this.end -= this.pageSize
      this.currentPage--
  }

  sortList(propertyName: string): void {
      this.sorter = this.sorter.startsWith("-") ? propertyName : "-" + propertyName
      this.firstPage()
  }

  onSelect(category: Category): void {
      this.selectedCategory = category
      this.router.navigate(['../categories', category.id], { relativeTo: this.route });  
  }
}