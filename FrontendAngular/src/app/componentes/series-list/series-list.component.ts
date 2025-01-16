import {Component, inject,} from '@angular/core';
import {SerieService} from "../../services/serie.service";
import {Serie} from "../../common/serie";
import {MatIconModule} from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SeriesModalComponent} from "../series-modal/series-modal.component";


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
private readonly  modalService: NgbModal=inject(NgbModal);

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


  eliminarSerie(serie: Serie) {
    if (confirm("Estas seguro de eliminar la serie?")){
      this.serieService.deleteSerie(serie._id).subscribe(
        {
          next:value => {
            console.log(value)
          },
          error: err => {
            console.error(err.message)
          }
        }
      )
    }
  }

  anadirSerie() {
    const modalRef= this.modalService.open(SeriesModalComponent)
    modalRef.componentInstance.editar=false;
    modalRef.componentInstance.categorias=this.categorias;
    modalRef.result.then(()=>{this.loadSeries()})
      .catch(err=>{this.loadSeries()})

  }

  editarSerie(serie: Serie) {
    const modalRef= this.modalService.open(SeriesModalComponent)
    modalRef.componentInstance.serie=serie;
    modalRef.componentInstance.editar=true;
    modalRef.componentInstance.categorias=this.categorias;
    modalRef.result.then(()=>{this.loadSeries()})
      .catch(err=>{this.loadSeries()})
  }
}
