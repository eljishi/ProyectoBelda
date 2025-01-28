import { Component, inject, Input, OnInit } from '@angular/core';
import { Serie } from "../../common/serie";
import { NgbActiveModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SerieService } from "../../services/serie.service";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-series-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FaIconComponent,
    CommonModule,
    RouterLink,
    NgbModule
  ],
  templateUrl: './series-modal.component.html',
  styleUrls: ['./series-modal.component.css']
})
export class SeriesModalComponent implements OnInit {
  @Input() serie!: Serie;
  @Input({ required: true }) editar: boolean = false;
  @Input({ required: true }) categoria: string[] = [];

  activeModal: NgbActiveModal = inject(NgbActiveModal);
  private readonly seriesService: SerieService = inject(SerieService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  protected readonly faPlusCircle = faPlusCircle;

  formSeries: FormGroup;
  anadirCategoria: FormGroup;

  constructor() {
    this.formSeries = this.formBuilder.group({
      _id: [''],
      titulo: ['', Validators.required],
      categorias: [[]],
      imagenes: [''],
      capitulos: ['', [Validators.required, Validators.min(1)]],
      emision: ['', Validators.required],
      sinopsis: ['', Validators.required],
    });

    this.anadirCategoria = this.formBuilder.group({
      nuevaCategoria: ['', Validators.required],
    });
  }

  get titulo() { return this.formSeries.get('titulo'); }
  get categorias() { return this.formSeries.get('categorias'); }
  get capitulos() { return this.formSeries.get('capitulos'); }
  get emision() { return this.formSeries.get('emision'); }
  get sinopsis() { return this.formSeries.get('sinopsis'); }
  get imagen() { return this.formSeries.get('imagenes'); }
  get nuevaCategoria() { return this.anadirCategoria.get('nuevaCategoria'); }

  ngOnInit() {
    if (this.editar && this.serie) {
      this.formSeries.patchValue({
        _id: this.serie._id || '',
        titulo: this.serie.titulo || '',
        categorias: this.serie.categorias || [],
        imagenes: this.serie.imagenes ? this.serie.imagenes[0] : '',
        capitulos: this.serie.capitulos || '',
        emision: this.serie.emision || '',
        sinopsis: this.serie.sinopsis || ''
      });
    }
  }

  anadirNuevaCategoria() {
    if (this.nuevaCategoria?.valid) {
      const nuevaCategoria = this.nuevaCategoria.value.trim();
      const categoriasActuales = this.categorias?.value || [];

      if (!categoriasActuales.includes(nuevaCategoria) && nuevaCategoria) {
        categoriasActuales.push(nuevaCategoria);
        this.formSeries.patchValue({ categorias: categoriasActuales });
        this.anadirCategoria.reset();

        if (this.editar) {
          this.guardarCambios();
        }
      }
    }
  }

  eliminarCategoria(categoria: string) {
    const categoriasActuales = this.categorias?.value || [];
    const nuevasCategorias = categoriasActuales.filter((cat: string) => cat !== categoria);
    this.formSeries.patchValue({ categorias: nuevasCategorias });

    if (this.editar) {
      this.guardarCambios();
    }
  }

  private guardarCambios() {
    if (this.formSeries.valid) {
      const formValue = this.formSeries.getRawValue();
      formValue.imagenes = formValue.imagenes ? [formValue.imagenes] : [];

      this.seriesService.updateSerie(formValue).subscribe({
        next: value => {
          console.log('Serie actualizada:', value);
        },
        error: error => {
          console.error('Error al actualizar serie:', error);
        }
      });
    }
  }

  onSubmit() {
    if (this.formSeries.valid) {
      const formValue = this.formSeries.getRawValue();
      formValue.imagenes = formValue.imagenes ? [formValue.imagenes] : [];

      if (this.editar) {
        this.seriesService.updateSerie(formValue).subscribe({
          next: value => {
            console.log('Serie actualizada:', value);
            this.activeModal.close(value);
          },
          error: error => {
            console.error('Error al actualizar serie:', error);
          },
        });
      } else {
        this.seriesService.addSerie(formValue).subscribe({
          next: value => {
            console.log('Serie añadida:', value);
            this.activeModal.close(value);
          },
          error: error => {
            console.error('Error al añadir serie:', error);
          },
        });
      }
    }
  }
}
