import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'login', component: LoginComponent},
    {path:'ihale', loadChildren: () => import('./features/ihale/ihale.routes').then(mod => mod.IHALE_ROUTES)},
    {path:'', component: DashboardComponent}
];
