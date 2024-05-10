import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { TeklifciComponent } from './features/dashboard/teklifci/teklifci.component';
import { TeklifciIhaleleriComponent } from './features/teklifci-ihaleleri/teklifci-ihaleleri.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'ihale',
    loadChildren: () =>
      import('./features/ihale/ihale.routes').then((mod) => mod.IHALE_ROUTES),
  },
  {
    path: 'teklif',
    loadChildren: () =>
      import('./features/teklif/teklif.routes').then(
        (mod) => mod.TEKLIF_ROUTES,
      ),
  },
  {
    path: 'isveren',
    component: DashboardComponent,
    data: { role: 'ISVEREN' },
    canActivate: [authGuard],
  },
  {
    path: 'teklifci-ihaleleri',
    component: TeklifciIhaleleriComponent,
    data: { role: 'TEKLIFCI' },
    canActivate: [authGuard],
  },
  {
    path: 'teklifci',
    component: TeklifciComponent,
    data: { role: 'TEKLIFCI' },
    canActivate: [authGuard],
  },
  { path: '', component: LoginComponent },
];
