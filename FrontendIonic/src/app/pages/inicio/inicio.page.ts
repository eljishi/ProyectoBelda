import {Component, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent, IonCardSubtitle,
  IonCardTitle, IonChip,
  IonContent, IonFab, IonFabButton,
  IonHeader, IonIcon,
  IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SeriesService} from "../../service/series.service";
import {ApiResponseSeries, Serie} from "../../common/interface";
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";
import {CabeceraPage} from "../cabecera/cabecera.page";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardContent, IonImg, IonCardTitle, IonChip, IonCardSubtitle, IonText, IonInfiniteScroll, IonInfiniteScrollContent, CabeceraPage, RouterLink, IonFab, IonFabButton, IonIcon]
})
export class InicioPage implements OnInit {
  private readonly seriesService: SeriesService = inject(SeriesService)
  miArray: Serie[] = [];
  miArrayInf: Serie[] = [];


  constructor() {
  }

  ngOnInit() {
    this.loadSeries();
    this.loadMore();
  }

  private loadSeries() {
    this.seriesService.getSeries().subscribe({
      next: value => {
        this.miArray = value.data;
        this.miArrayInf = this.miArray.slice(0, 5);
      }
    });
  }

  public loadMore(event?: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      const currentLength = this.miArrayInf.length;
      const nextItems = this.miArray.slice(currentLength, currentLength + 3);

      this.miArrayInf.push(...nextItems);

      if (event) {
        event.target.complete();

        if (this.miArrayInf.length >= this.miArray.length) {
          event.target.disabled = true;
        }
      }
    }, 2000);
  }
  @Input({required: true}) serie!: Serie;
}
