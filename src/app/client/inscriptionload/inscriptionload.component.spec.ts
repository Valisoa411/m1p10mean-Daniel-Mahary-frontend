import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionloadComponent } from './inscriptionload.component';

describe('InscriptionloadComponent', () => {
  let component: InscriptionloadComponent;
  let fixture: ComponentFixture<InscriptionloadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionloadComponent]
    });
    fixture = TestBed.createComponent(InscriptionloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
