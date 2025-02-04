import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent, IonCardSubtitle, IonCardTitle, IonChip,
  IonContent,
  IonHeader, IonImg,
  IonSearchbar, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Serie} from "../../common/interface";
import {SeriesService} from "../../service/series.service";
import {CabeceraPage} from "../cabecera/cabecera.page";
@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonSearchbar, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonImg, IonText, CabeceraPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusquedaPage implements OnInit {
  private readonly seriesService:SeriesService=inject(SeriesService)
  series:Serie[]=[];
  serieBuscada: Serie[]=[];

  constructor() {
      }

  ngOnInit() {
    this.loadSeries();
  }

  private loadSeries() {
    this.seriesService.getSeries().subscribe({
        next: value => {
          this.series = value.data;
        }
      }
    )
  }

  onSearch(event: CustomEvent) {
    const searchTerm = event.detail.value?.toLowerCase() || '';

    if (!searchTerm) {
      this.serieBuscada = [];
      return;
    }
    this.serieBuscada = this.series.filter(serie =>
      serie.titulo.toLowerCase().includes(searchTerm)
    );
  }


}
