import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientBusinessDetailComponent } from './client-business-detail.component';

describe('ClientBusinessDetailComponent', () => {
  let component: ClientBusinessDetailComponent;
  let fixture: ComponentFixture<ClientBusinessDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientBusinessDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientBusinessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
