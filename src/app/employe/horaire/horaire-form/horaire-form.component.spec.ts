import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraireFormComponent } from './horaire-form.component';

describe('HoraireFormComponent', () => {
  let component: HoraireFormComponent;
  let fixture: ComponentFixture<HoraireFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HoraireFormComponent]
    });
    fixture = TestBed.createComponent(HoraireFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
