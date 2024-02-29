import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedepenseComponent } from './listedepense.component';

describe('ListedepenseComponent', () => {
  let component: ListedepenseComponent;
  let fixture: ComponentFixture<ListedepenseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListedepenseComponent]
    });
    fixture = TestBed.createComponent(ListedepenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
