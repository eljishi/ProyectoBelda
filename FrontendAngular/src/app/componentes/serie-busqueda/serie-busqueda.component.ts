import {Component, inject} from '@angular/core';
import {Serie} from "../../common/serie";
import {SerieService} from "../../services/serie.service";

@Component({
  selector: 'app-serie-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './serie-busqueda.component.html',
  styleUrl: './serie-busqueda.component.css'
})



export class SerieBusquedaComponent {

  private readonly  serieService: SerieService=inject(SerieService);

  serie:Serie[]=[];
  categorias:string[]=[];

  constructor() {
    this.loadSerie();
  }


  private loadSerie() {
    this.serieService.getSeries().subscribe(
      {

        next:value => {this.serie=value.data},
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
