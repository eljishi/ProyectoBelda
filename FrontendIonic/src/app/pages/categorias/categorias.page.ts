import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonCard, IonCardHeader, IonCardTitle, IonChip, IonCol,
  IonContent, IonFab, IonFabButton,
  IonIcon,
  IonImg, IonRow,
} from '@ionic/angular/standalone';
import {SeriesService} from "../../service/series.service";
import {Serie} from "../../common/interface";
import {CabeceraPage} from "../cabecera/cabecera.page";
import {RouterLink} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule,
    FormsModule, IonIcon, IonChip,
    IonCol, IonRow, IonFab, IonFabButton, RouterLink, CabeceraPage, IonCard, IonCardHeader, IonCardTitle, IonImg,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasPage implements OnInit {
  private readonly seriesService: SeriesService = inject(SeriesService);
  series: Serie[] = [];
  seriesFiltradas: Serie[] = [];
  categorias: string[] = [];
  categoriaSeleccionada:  string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoriaSeleccionada = params['search'] || '';
      this.loadSeries(this.categoriaSeleccionada);
    });
  }

  private loadSeries(categoria: string) {
    this.seriesService.getSeries().subscribe({
      next: value => {
        this.series = value.data;

        this.seriesFiltradas = categoria
          ? this.series.filter(serie => serie.categorias.includes(categoria))
          : this.series;

        console.log(this.seriesFiltradas);
      }
    });

    this.seriesService.getCategorias().subscribe({
      next: value => {
        this.categorias = value.data;
        console.log(value);
      },
      error: err => {
        console.error(err.message);
      },
      complete: () => {
        console.log('Categorias cargadas');
      }
    });
  }

  filterByCategory(categoria: string) {
    if (this.categoriaSeleccionada === categoria) {

      this.categoriaSeleccionada = '';
      this.seriesFiltradas = this.series;
    } else {

      this.categoriaSeleccionada = categoria;
      this.seriesFiltradas = this.series.filter(serie =>
        serie.categorias?.includes(categoria)
      );
    }
  }
}
