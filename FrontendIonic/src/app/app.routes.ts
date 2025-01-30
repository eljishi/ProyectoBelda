import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./pages/tabs/tabs.page').then( m => m.TabsPage),
    children:[
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage)
      },
      {
        path: 'busqueda',
        loadComponent: () => import('./pages/busqueda/busqueda.page').then( m => m.BusquedaPage)
      },
      {
        path: 'categorias',
        loadComponent: () => import('./pages/categorias/categorias.page').then( m => m.CategoriasPage)
      },
    ]
  },
  {
    path: 'cabecera',
    loadComponent: () => import('./pages/cabecera/cabecera.page').then( m => m.CabeceraPage)
  },
];

