import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'ihale',
    loadChildren: () =>
      import('./features/ihale/ihale.routes').then((mod) => mod.IHALE_ROUTES),
    data: { role: 'ISVEREN' },
    canActivate: [authGuard],
  },
  {
    path: 'teklif',
    loadChildren: () =>
      import('./features/teklif/teklif.routes').then(
        (mod) => mod.TEKLIF_ROUTES,
      ),
  },
  {
    path: 'teklifci',
    loadChildren: () =>
      import('./features/teklifci/teklifci.routes').then(
        (mod) => mod.TEKLIFCI_ROUTES,
      ),
    data: { role: 'TEKLIFCI' },
    canActivate: [authGuard],
  },
  {
    path: 'isveren',
    component: DashboardComponent,
    data: { role: 'ISVEREN' },
    canActivate: [authGuard],
  },
  { path: '', component: LoginComponent },
];
