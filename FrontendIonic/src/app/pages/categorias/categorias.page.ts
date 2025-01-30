import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonButton, IonChip, IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg, IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SeriesService} from "../../service/series.service";
import {Serie} from "../../common/interface";
import {CabeceraPage} from "../cabecera/cabecera.page";

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon, IonImg, IonButton, IonAvatar, IonChip, IonCol, IonRow, CabeceraPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoriasPage implements OnInit {

  private readonly seriesService:SeriesService=inject(SeriesService)
  series:Serie[]=[];
  serieBuscada: Serie[]=[];
  categorias: string[] = [];

  constructor() { }

  ngOnInit() {
    this.loadSeries();
  }

  private loadSeries() {
    this.seriesService.getSeries().subscribe({
        next: value => {
          this.series = value.data;
        }
      }
    );
    this.seriesService.getCategorias().subscribe({
      next: value => {
        this.categorias = value.data;
        console.log(value)
      },
      error: err => {
        console.error(err.message);
      },
      complete: () => {
        console.log('Categorias cargadas');
      }
    });
  }

}
