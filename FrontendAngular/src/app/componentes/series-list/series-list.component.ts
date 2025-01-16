import {Component, inject,} from '@angular/core';
import {SerieService} from "../../services/serie.service";
import {Serie} from "../../common/serie";
import {MatIconModule} from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-series-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})

export class SeriesListComponent {
private readonly  serieService: SerieService=inject(SerieService);

series:Serie[] = [];
categorias:string[]=[];

constructor() {
  this.loadSeries();
}


  private loadSeries() {
    this.serieService.getSeries().subscribe(
      {

        next:value => {this.series=value.data},
        error: err => {
          console.error(err.message)},
        complete: () => {
          console.log('Series cargadas')}
      }
    )
    this.serieService.getCategorias().subscribe(
      {
        next:value => {this.categorias=value.data},
        error: err => {
          console.error(err.message)},
        complete: () => {
          console.log('Categorias cargadas')}
      }
    )
  }


}
