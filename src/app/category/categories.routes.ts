import { Routes } from '@angular/router';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategorytListComponent } from './category-list/category-list.component';
import { CategoryInsertComponent } from './category-insert/category-insert.component';

export const routes: Routes = [
  { path: '', component: CategorytListComponent },
  { path: 'insert', component: CategoryInsertComponent },
  { path: ':id', component: CategoryDetailComponent },
];
