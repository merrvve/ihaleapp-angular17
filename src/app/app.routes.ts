import { Routes } from '@angular/router';
import { LoginComponent } from './features/user/login/login.component';
import { DashboardComponent } from './features/home/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { TeklifciComponent } from './features/dashboard/teklifci/teklifci.component';
import { TeklifciIhaleleriComponent } from './features/teklifci/teklifci-ihaleleri/teklifci-ihaleleri.component';
import { TeklifciTeklifleriComponent } from './features/teklifci/teklifci-teklifleri/teklifci-teklifleri.component';

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
