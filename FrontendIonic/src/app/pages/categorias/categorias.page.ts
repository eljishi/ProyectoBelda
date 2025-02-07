import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard, IonCardHeader, IonCardTitle, IonChip, IonCol,
  IonContent, IonFab, IonFabButton, IonIcon, IonImg, IonRow,
  IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import {SeriesService} from "../../service/series.service";
import {Serie} from "../../common/interface";
import {CabeceraPage} from "../cabecera/cabecera.page";
import {RouterLink} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {InfiniteScrollCustomEvent} from "@ionic/angular";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule, IonIcon, IonChip,
    IonCol, IonRow, IonFab, IonFabButton, RouterLink, CabeceraPage,
    IonCard, IonCardHeader, IonCardTitle, IonImg,
    IonInfiniteScroll, IonInfiniteScrollContent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasPage implements OnInit {
  private readonly seriesService: SeriesService = inject(SeriesService);
  series: Serie[] = [];
  seriesFiltradaInf: Serie[] = [];
  categorias: string[] = [];
  categoriaSeleccionada: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.categoriaSeleccionada = params['search'] || '';
      this.loadCategorias();
      this.loadSeries(this.categoriaSeleccionada);
    });
  }

  private loadCategorias() {
    this.seriesService.getCategorias().subscribe({
      next: value => {
        this.categorias = value.data;
        console.log(value);
      },
      error: err => {
        console.error(err.message);
      }
    });
  }

  private loadSeries(categoria: string) {
    if (categoria) {
      this.seriesService.getSerieCategoria(categoria).subscribe({
        next: value => {
          this.series = value.data;
          this.seriesFiltradaInf = this.series.slice(0, 5);
          console.log(this.seriesFiltradaInf);
        },
        error: err => {
          console.error(err.message);
          this.series = [];
          this.seriesFiltradaInf = [];
        }
      });
    } else {
      this.seriesService.getSeries().subscribe({
        next: value => {
          this.series = value.data;
          this.seriesFiltradaInf = this.series.slice(0, 5);
        }
      });
    }
  }

  public loadMore(event?: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      const currentLength = this.seriesFiltradaInf.length;
      const nextItems = this.series.slice(currentLength, currentLength + 3);

      this.seriesFiltradaInf.push(...nextItems);

      if (event) {
        event.target.complete();

        if (this.seriesFiltradaInf.length >= this.series.length) {
          event.target.disabled = true;
        }
      }
    }, 2000);
  }

  filtrarPorCategoria(categoria: string) {
    if (this.categoriaSeleccionada === categoria) {
      this.categoriaSeleccionada = '';
      this.loadSeries('');
    } else {
      this.categoriaSeleccionada = categoria;
      this.loadSeries(categoria);
    }
  }
}
