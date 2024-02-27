import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivitacheComponent } from './suivitache.component';

describe('SuivitacheComponent', () => {
  let component: SuivitacheComponent;
  let fixture: ComponentFixture<SuivitacheComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuivitacheComponent]
    });
    fixture = TestBed.createComponent(SuivitacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
