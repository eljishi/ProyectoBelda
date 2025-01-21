import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent, IonCardSubtitle,
  IonCardTitle, IonChip,
  IonContent,
  IonHeader,
  IonImg, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {SeriesService} from "../../service/series.service";
import {ApiResponseSeries, Serie} from "../../common/interface";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardContent, IonImg, IonCardTitle, IonChip, IonCardSubtitle, IonText]
})
export class InicioPage implements OnInit {
  private readonly seriesService:SeriesService=inject(SeriesService)
   miArray:Serie[]=[];



  constructor() { }

  ngOnInit() {
    this.loadSeries();
  }

  private loadSeries() {
    this.seriesService.getSeries().subscribe({
        next: value => {
          this.miArray = value.data;
        }
      }
    )
  }}
