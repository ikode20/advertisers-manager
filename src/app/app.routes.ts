import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'advertisers',
    pathMatch: 'full',
  },
  {
    path: 'advertisers',
    loadChildren: () => import('./features/advertisers/advertisers.routes').then(m => m.routes),
  },
];
