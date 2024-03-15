import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CategoryService } from '../category.service'; // Ajusta la ruta de importación según tu estructura
import { Category } from '../../models/category.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  category: Category = {name: ''};
  editMode: boolean = false;

  private categoryService = inject(CategoryService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

 

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');
    if (categoryId) {
      this.categoryService.getCategoryById(Number.parseInt(categoryId)).subscribe({
        next: (data) => {
          this.category = data;
        },
        error: (error) => {
          console.error('There was an error!', error);
          // Aquí puedes añadir algún manejo de error o notificación
        }
      });
    }
  }

  mierda(){
    console.log("funciona")
    this.router.navigate(["/categories"])
  }

  updateCategory(updatedCategory: Category): void {
    this.categoryService.updateCategory(this.category.id!, updatedCategory).subscribe({
      next: () => {
        this.editMode = false;
        // Aquí puedes añadir alguna notificación de éxito
      },
      error: (error) => {
        console.error('Error updating category!', error);
        // Aquí puedes añadir algún manejo de error o notificación
      }
    });
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        // Redirigir al usuario a la lista de categorías después de la eliminación
        this.router.navigate(['/categories']);
        // Aquí puedes añadir alguna notificación de éxito
      },
      error: (error) => {
        console.error('Error deleting category!', error);
        // Aquí puedes añadir algún manejo de error o notificación
      }
    });
  }
}
