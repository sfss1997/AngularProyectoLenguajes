import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProfessorCourseComponent } from './add-professor-course.component';

describe('AddProfessorCourseComponent', () => {
  let component: AddProfessorCourseComponent;
  let fixture: ComponentFixture<AddProfessorCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProfessorCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProfessorCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
