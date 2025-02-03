import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {register} from "swiper/element/bundle";
import {MenuComponent} from "./componentes/menu/menu.component";
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, MenuComponent],
  standalone: true
})
export class AppComponent {
  constructor() {}
}
