import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResorceTypeComponent } from './resorce-type.component';

describe('ResorceTypeComponent', () => {
  let component: ResorceTypeComponent;
  let fixture: ComponentFixture<ResorceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResorceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResorceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
