import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreaffaireComponent } from './chiffreaffaire.component';

describe('ChiffreaffaireComponent', () => {
  let component: ChiffreaffaireComponent;
  let fixture: ComponentFixture<ChiffreaffaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChiffreaffaireComponent]
    });
    fixture = TestBed.createComponent(ChiffreaffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
