import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanComponentDeactivateComponent } from './can-component-deactivate.component';

describe('CanComponentDeactivateComponent', () => {
  let component: CanComponentDeactivateComponent;
  let fixture: ComponentFixture<CanComponentDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanComponentDeactivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanComponentDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
