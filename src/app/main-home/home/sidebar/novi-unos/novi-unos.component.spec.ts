import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviUnosComponent } from './novi-unos.component';

describe('NoviUnosComponent', () => {
  let component: NoviUnosComponent;
  let fixture: ComponentFixture<NoviUnosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoviUnosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoviUnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
