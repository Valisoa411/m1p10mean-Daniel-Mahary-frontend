import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedepenseComponent } from './createdepense.component';

describe('CreatedepenseComponent', () => {
  let component: CreatedepenseComponent;
  let fixture: ComponentFixture<CreatedepenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatedepenseComponent]
    });
    fixture = TestBed.createComponent(CreatedepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
