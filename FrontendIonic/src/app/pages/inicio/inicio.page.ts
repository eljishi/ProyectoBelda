import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent, IonCardSubtitle,
  IonCardTitle, IonChip,
  IonContent,
  IonHeader,
  IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SeriesService} from "../../service/series.service";
import {ApiResponseSeries, Serie} from "../../common/interface";
import {InfiniteScrollCustomEvent, IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardContent, IonImg, IonCardTitle, IonChip, IonCardSubtitle, IonText, IonInfiniteScroll, IonInfiniteScrollContent]
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
    }, 5000);
  }
}
