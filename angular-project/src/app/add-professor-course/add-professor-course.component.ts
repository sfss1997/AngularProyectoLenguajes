import { Component, OnInit } from '@angular/core';
import { ProfessorService } from '../professor.service';
import { CourseService } from '../course.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-professor-course',
  templateUrl: './add-professor-course.component.html',
  styleUrls: ['./add-professor-course.component.css']
})
export class AddProfessorCourseComponent implements OnInit {

  public professorsList: any = [];
  public selectedProfessor: { name: string, id: number };
  public defaultItemProfessor: { name: string, id: number } = { name: "Seleccione", id: null };

  public courseList: any = [];
  public selectedCourse: { name: string, id: number };
  public defaultItemCourse: { name: string, id: number } = { name: "Seleccione", id: null };

  constructor(private courseService: CourseService, private router: Router, private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.getCourses();
    this.getProfessors();
  }

  add() {
    var course = {
      "userId": this.selectedProfessor.id,
      "courseId": this.selectedCourse.id
    };

    this.professorService.addProfessorCourse(course).subscribe((result) => {
      this.router.navigate(['/admin-view', 1]);
    });
  }

  getCourses() {
    this.courseService.getCourses().subscribe((data: {}) => {
      this.courseList = data;
    });
  }

  getProfessors() {
    this.professorService.getProfessors().subscribe((data: {}) => {
      this.professorsList = data;
    });
  }

  professorChange(value) {
    this.selectedProfessor = value;
  }

  coursesChange(value) {
    this.selectedCourse = value;
  }

}
