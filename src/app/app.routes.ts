import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UpdateBalanceComponent } from './update-balance/update-balance.component';
import { CustomCategoryComponent } from './custom-category/custom-category.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {   
        path: '',
        component: HomeComponent
    },
    {
        path: 'balance',
        component: UpdateBalanceComponent
    },
    {
        path: 'categories',
        component: CustomCategoryComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];
