import { Component, Signal, inject, computed } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ActivatedRoute, Router, RouterModule } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { Product } from '../../models/product.interface'
import { ProductService } from '../product.service'
import { OrderBy } from '../../utils/orderBy.pipe'

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, OrderBy],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  private productService = inject(ProductService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  title = "Products"
  products: Signal<Product[]> = toSignal(this.productService.products$, {initialValue: []})
  productsNumber: Signal<number> = computed(() => this.products().length)
  hasProducts: Signal<boolean> = computed(() => this.productsNumber() > 0)

  selectedProduct!: Product
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

  onSelect(product: Product): void {
      this.selectedProduct = product
      this.router.navigate(['../products', product.id], { relativeTo: this.route });  
  }
}