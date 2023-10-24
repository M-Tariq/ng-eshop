import { Route } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },

            {
                path: 'categories',
                component: CategoriesListComponent
            },

            {
                path: 'categories/form',
                component: CategoriesFormComponent
            },

            {
                path: 'categories/form/:id',
                component: CategoriesFormComponent
            },

            {
                path: 'products',
                component: ProductsListComponent
            },

            {
                path: 'products/form',
                component: ProductFormComponent
            },

            {
                path: 'products/form/:id',
                component: ProductFormComponent
            },


            {
                path: 'ordered',
                component: DashboardComponent
            },

            {
                path: 'users',
                component: UsersListComponent
            },

            {
                path: 'users/form',
                component: UserFormComponent
            },

            {
                path: 'users/form/:id',
                component: UserFormComponent
            },

            {
                path: 'logout',
                component: DashboardComponent
            }
        ]
    }
];
