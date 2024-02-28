import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientListEmployeComponent } from './client-list-employe.component';

describe('ClientListEmployeComponent', () => {
  let component: ClientListEmployeComponent;
  let fixture: ComponentFixture<ClientListEmployeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientListEmployeComponent]
    });
    fixture = TestBed.createComponent(ClientListEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
