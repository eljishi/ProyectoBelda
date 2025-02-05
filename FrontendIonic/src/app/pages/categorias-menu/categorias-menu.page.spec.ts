import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriasMenuPage } from './categorias-menu.page';

describe('CategoriasMenuPage', () => {
  let component: CategoriasMenuPage;
  let fixture: ComponentFixture<CategoriasMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriasMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
