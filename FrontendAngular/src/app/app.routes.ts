import { Routes } from '@angular/router';
import {SeriesListComponent} from "./componentes/series-list/series-list.component";


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'series-list',
    pathMatch: 'full',
  },
  {
    path: 'series-list',
    component:SeriesListComponent
  }
];
