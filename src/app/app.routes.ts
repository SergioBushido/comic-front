import { Routes } from '@angular/router';

import { HomeComponent } from './shared/home.component';
import { ErrorComponent } from './shared/error.component';

export const routes: Routes = [
    { path: '', redirectTo:'/home', pathMatch:'full' },
    { path: 'home', component: HomeComponent },
    { path: 'admin', loadComponent: () => import('./shared/admin.component') },
    { path: 'categories', loadChildren: ()=> import('./category/categories.routes').then(m => m.routes) },
    { path: 'products', loadChildren: ()=> import('./product/products.routes').then(m => m.routes) },
    { path: 'upload', loadChildren: ()=> import('./upload/upload.routes').then(m => m.routes) },
    { path: 'error', component: ErrorComponent },
    { path: '**', redirectTo:'/error?reason=NavError' }
];
