import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle, IonCardTitle, IonChip,
  IonContent, IonFab, IonFabButton, IonFabList, IonIcon, IonImg, IonText,

} from '@ionic/angular/standalone';
import {SeriesService} from "../../service/series.service";
import {ApiResponseSerie} from "../../common/interface";
import {addIcons} from "ionicons";
import {add, logoFacebook, logoGithub, logoInstagram, logoTiktok, logoTwitter, logoYoutube} from "ionicons/icons";

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonChip, IonImg, IonText, IonFab, IonFabButton, IonIcon, IonFabList],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetallesPage implements OnInit {

  @Input() id!: string;
  private readonly seriesService: SeriesService = inject(SeriesService)
  serie!: ApiResponseSerie;

  constructor() {
    addIcons({logoFacebook,logoYoutube,logoTwitter,logoInstagram,add,logoGithub,logoTiktok});

  }

  ngOnInit() {
    if (this.id) {
      this.loadSeries();
    } else {
      console.error('No series ID provided');
    }
    console.log(this.id)
  }

  private loadSeries() {
    this.seriesService.getSerie(this.id).subscribe(
      {
        next: value => {
          console.log(value)
          this.serie = value;
        },
        error: err => {
          console.error(err);
        },
        complete: () => {
          console.log('User ' + this.id + 'loaded');
        }
      }
    )
  }
}
