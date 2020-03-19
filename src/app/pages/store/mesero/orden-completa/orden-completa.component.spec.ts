import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompletaComponent } from './orden-completa.component';

describe('OrdenCompletaComponent', () => {
  let component: OrdenCompletaComponent;
  let fixture: ComponentFixture<OrdenCompletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdenCompletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenCompletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
