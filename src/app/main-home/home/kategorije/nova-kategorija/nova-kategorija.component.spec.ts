import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NovaKategorijaComponent } from './nova-kategorija.component';

describe('NovaKategorijaComponent', () => {
  let component: NovaKategorijaComponent;
  let fixture: ComponentFixture<NovaKategorijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovaKategorijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaKategorijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
