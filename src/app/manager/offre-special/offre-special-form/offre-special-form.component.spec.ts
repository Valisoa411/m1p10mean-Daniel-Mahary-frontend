import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreSpecialFormComponent } from './offre-special-form.component';

describe('OffreSpecialFormComponent', () => {
  let component: OffreSpecialFormComponent;
  let fixture: ComponentFixture<OffreSpecialFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffreSpecialFormComponent]
    });
    fixture = TestBed.createComponent(OffreSpecialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
