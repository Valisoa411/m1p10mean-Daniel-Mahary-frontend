import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerdvemployeComponent } from './listerdvemploye.component';

describe('ListerdvemployeComponent', () => {
  let component: ListerdvemployeComponent;
  let fixture: ComponentFixture<ListerdvemployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListerdvemployeComponent]
    });
    fixture = TestBed.createComponent(ListerdvemployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
