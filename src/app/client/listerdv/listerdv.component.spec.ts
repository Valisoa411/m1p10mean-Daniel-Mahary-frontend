import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerdvComponent } from './listerdv.component';

describe('ListerdvComponent', () => {
  let component: ListerdvComponent;
  let fixture: ComponentFixture<ListerdvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListerdvComponent]
    });
    fixture = TestBed.createComponent(ListerdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
