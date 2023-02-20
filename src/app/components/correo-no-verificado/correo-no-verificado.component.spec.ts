import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreoNOVerificadoComponent } from './correo-no-verificado.component';

describe('CorreoNOVerificadoComponent', () => {
  let component: CorreoNOVerificadoComponent;
  let fixture: ComponentFixture<CorreoNOVerificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorreoNOVerificadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorreoNOVerificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
