import {Component, inject, Input, OnInit} from '@angular/core';
import {Serie} from "../../common/serie";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SerieService} from "../../services/serie.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-series-modal',
  standalone: true,
  imports: [],
  templateUrl: './series-modal.component.html',
  styleUrl: './series-modal.component.css'
})
export class SeriesModalComponent implements OnInit {

  @Input() serie!: Serie;
  @Input({required:true})editar!: boolean;
  @Input({required:true})categoria!: string;

  activeModal:NgbActiveModal=inject(NgbActiveModal);
  private readonly seriesService: SerieService=inject(SerieService);
  private readonly formBuilder: FormBuilder=inject(FormBuilder);


  formSeries:FormGroup=this.formBuilder.group({
    _id:[''],
    titulo:[''],
    categorias:[],
    imagenes:[''],
    capitulos:[''],
    emision:[''],
    sinopsis:[''],

  });

  anadirCategoria:FormGroup=this.formBuilder.group({
    nuevaCategoria: [''],
  })

  get titulo():any{
    return this.formSeries.get('titulo');
  }
  get categorias():any{
    return this.formSeries.get('categorias');
  }
  get capitulos():any{
    return this.formSeries.get('capitulos');
  }
  get emision():any{
    return this.formSeries.get('emision');
  }get sinopsis():any{
    return this.formSeries.get('sinopsis');
  }
  get nuevaCategoria():any{
  return this.anadirCategoria.get('nuevaCategoria');
}



  ngOnInit() {
    if (this.editar) {
      this.formSeries.setValue(this.serie);
    }else {
      this.formSeries.reset();
    }
  }

  anadirNuevaCategoria(nuevaCategoria:any){
    if(!this.editar)this.categorias.push(nuevaCategoria);
    else {
      let nuevaCategoria;
      nuevaCategoria = this.formSeries.getRawValue().categoria;
      nuevaCategoria.push(nuevaCategoria);
      this.formSeries.setControl("categorias", new FormControl(nuevaCategoria));
      this.categorias.push(nuevaCategoria)

    }
    this.anadirCategoria.reset();
  }
}
