import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SeriesNavbarComponent} from "./componentes/series-navbar/series-navbar.component";
import {SeriesListComponent} from "./componentes/series-list/series-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SeriesNavbarComponent, SeriesListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontendAngular';

}
