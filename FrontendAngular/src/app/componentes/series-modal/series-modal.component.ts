import { Component, inject, Input, OnInit } from '@angular/core';
import { Serie } from "../../common/serie";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { SerieService } from "../../services/serie.service";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-series-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FaIconComponent
  ],
  templateUrl: './series-modal.component.html',
  styleUrls: ['./series-modal.component.css']
})
export class SeriesModalComponent implements OnInit {

  @Input() serie!: Serie;
  @Input({ required: true }) editar!: boolean;
  @Input({ required: true }) categoria!: string[];

  activeModal: NgbActiveModal = inject(NgbActiveModal);
  private readonly seriesService: SerieService = inject(SerieService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  protected readonly faPlusCircle = faPlusCircle;

  formSeries: FormGroup = this.formBuilder.group({
    _id: [''],
    titulo: [''],
    categorias: [[]],
    imagenes: [''],
    capitulos: [''],
    emision: [''],
    sinopsis: [''],
  });

  anadirCategoria: FormGroup = this.formBuilder.group({
    nuevaCategoria: [''],
  });

  get titulo() { return this.formSeries.get('titulo'); }
  get categorias() { return this.formSeries.get('categorias'); }
  get capitulos() { return this.formSeries.get('capitulos'); }
  get emision() { return this.formSeries.get('emision'); }
  get sinopsis() { return this.formSeries.get('sinopsis'); }
  get imagen() { return this.formSeries.get('imagenes'); }
  get nuevaCategoria() { return this.anadirCategoria.get('nuevaCategoria'); }

  ngOnInit() {
    if (this.editar && this.serie) {
      this.formSeries.patchValue(this.serie);
    } else {
      this.formSeries.reset();
    }
  }

  anadirNuevaCategoria() {
    const nuevaCategoria = this.nuevaCategoria?.value;
    if (nuevaCategoria) {
      const categorias = this.formSeries.get('categorias')?.value || [];
      categorias.push(nuevaCategoria);
      this.formSeries.get('categorias')?.setValue(categorias);
      this.anadirCategoria.reset();
    }
  }

  onSubmit() {
    if (this.formSeries.valid) {
      if (this.editar) {
        this.seriesService.updateSerie(this.formSeries.getRawValue()).subscribe({
          next: value => console.log(value),
          complete: () => this.activeModal.dismiss(),
          error: error => console.error(error),
        });
      } else {
        this.seriesService.addSerie(this.formSeries.getRawValue()).subscribe({
          next: value => console.log(value),
          complete: () => this.activeModal.dismiss(),
          error: error => console.error(error),
        });
      }
    }
  }

  reloadPage() {
    location.reload();
  }
}
