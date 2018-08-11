import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTaskFormComponent } from './add-new-task-form.component';

describe('AddNewTaskFormComponent', () => {
  let component: AddNewTaskFormComponent;
  let fixture: ComponentFixture<AddNewTaskFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTaskFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
