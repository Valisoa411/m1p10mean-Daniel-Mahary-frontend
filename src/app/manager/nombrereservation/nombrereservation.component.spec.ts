import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombrereservationComponent } from './nombrereservation.component';

describe('NombrereservationComponent', () => {
  let component: NombrereservationComponent;
  let fixture: ComponentFixture<NombrereservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NombrereservationComponent]
    });
    fixture = TestBed.createComponent(NombrereservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
