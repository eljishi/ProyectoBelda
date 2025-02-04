import {Component, inject, OnInit} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {Serie} from "../../common/interface";
import {SeriesService} from "../../service/series.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    IonicModule
  ]
})
export class MenuComponent  implements OnInit {

  private readonly seriesService:SeriesService=inject(SeriesService)
  series:Serie[]=[];
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
