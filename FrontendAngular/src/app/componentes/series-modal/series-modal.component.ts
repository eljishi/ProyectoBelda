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
    NgbModule
  ],
  templateUrl: './series-modal.component.html',
  styleUrls: ['./series-modal.component.css']
})
export class SeriesModalComponent implements OnInit {
  @Input() serie!: Serie;
  @Input({required: true}) editar: boolean = false;
  @Input({required: true}) categorias: string[] = [];

  activeModal: NgbActiveModal = inject(NgbActiveModal);
  private readonly seriesService: SerieService = inject(SerieService);
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  protected readonly faPlusCircle = faPlusCircle;

  formSeries: FormGroup;
  anadirCategoria: FormGroup;
  listaCategorias: string[] = [];
  imagenesList: string[] = [];

  constructor() {
    this.formSeries = this.formBuilder.group({
      titulo: ['', Validators.required],
      categorias: [[]],
      imagenes: [[]],
      capitulos: ['', [Validators.required, Validators.min(1)]],
      emision: ['', Validators.required],
      sinopsis: ['', Validators.required],
    });

    this.anadirCategoria = this.formBuilder.group({
      nuevaCategoria: ['', Validators.required],
    });
  }

  get titulo() {
    return this.formSeries.get('titulo');
  }

  get capitulos() {
    return this.formSeries.get('capitulos');
  }

  get emision() {
    return this.formSeries.get('emision');
  }

  get sinopsis() {
    return this.formSeries.get('sinopsis');
  }

  get nuevaCategoria() {
    return this.anadirCategoria.get('nuevaCategoria');
  }

  ngOnInit() {
    if (this.editar && this.serie) {
      this.imagenesList = this.serie.imagenes || [];
      this.listaCategorias = this.serie.categorias || [];

      this.formSeries.patchValue({
        _id: this.serie._id,
        titulo: this.serie.titulo,
        categorias: this.listaCategorias,
        imagenes: this.serie.imagenes,
        capitulos: this.serie.capitulos,
        emision: this.serie.emision,
        sinopsis: this.serie.sinopsis
      });
    }
  }

  agregarImagen(url: string) {
    if (url && url.trim()) {
      this.imagenesList = [...this.imagenesList, url.trim()];
      this.formSeries.patchValue({imagenes: this.imagenesList});
    }
  }

  eliminarImagen(index: number) {
    this.imagenesList = this.imagenesList.filter((_, i) => i !== index);
    this.formSeries.patchValue({imagenes: this.imagenesList});
  }

  anadirNuevaCategoria() {
    if (this.nuevaCategoria?.valid && this.nuevaCategoria.value) {
      const nuevaCat = this.nuevaCategoria.value.trim();
      if (nuevaCat && !this.listaCategorias.includes(nuevaCat)) {
        this.listaCategorias = [...this.listaCategorias, nuevaCat];
        this.formSeries.patchValue({categorias: this.listaCategorias});
        this.anadirCategoria.reset();

        if (this.editar) {
          this.guardarCambios();
        }
      }
    }
  }

  eliminarCategoria(categoria: string) {
    this.listaCategorias = this.listaCategorias.filter(cat => cat !== categoria);
    this.formSeries.patchValue({categorias: this.listaCategorias});

    if (this.editar) {
      this.guardarCambios();
    }
  }

  private guardarCambios() {
    if (this.formSeries.valid && this.serie?._id) {
      const formValue = {...this.formSeries.getRawValue()};
      formValue.categorias = this.listaCategorias;
      formValue.imagenes = this.imagenesList;
      formValue._id = this.serie._id;

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
      const formValue = {...this.formSeries.getRawValue()};
      formValue.categorias = this.listaCategorias;
      formValue.imagenes = this.imagenesList;

      if (this.editar) {
        formValue._id = this.serie._id;
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
        const {_id, ...serieData} = formValue;
        this.seriesService.addSerie(serieData).subscribe({
          next: value => {
            console.log('Serie añadida:', value);
            this.activeModal.close(value);
          },
          error: error => {
            console.error('Error al añadir serie:', error);
            if (error.error) {
              console.error('Detalles del error:', error.error);
            }
          },
        });
      }
    }
  }
}
