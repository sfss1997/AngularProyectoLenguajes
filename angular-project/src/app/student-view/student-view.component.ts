import { Component, OnInit} from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CourseService } from '../course.service';
import { StudentServiceService } from '../student-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfessorService } from '../professor.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  public selected = 'Perfil';
  public studentCourses:any = [];
  public selectedCourse: { courseName: string, course_id: number};
  public defaultItemCourse: { courseName: string, course_id: number } = { courseName: "Seleccione un curso", course_id: null };
  publicConsultation:any = [];
  repliesPublicConsultation:any = [];
  show = false;
  repliesPublicConsultationForm: FormGroup;
  publicConsultationForm: FormGroup;
  date:any;
  course:any;
  student:any;
  studentPublicConsultation:any;
  students:any = [];
  professors:any = [];
  courses:any = [];
  professorCourse:any;
  currentPublicConsultation:any = {};

  publicConsult:any = { courseId: 0, professorId: 0};

  public items: Array<DrawerItem> = [
    { text: 'Perfil', icon: 'k-i-user', selected: true  },
    { text: 'Noticias', icon: 'k-i-form-element'},
    { text: 'Cursos', icon: 'k-i-change-manually' },
    { text: 'Consulta pública', icon: 'k-i-unlock' }, 
    { text: 'Consulta privada', icon: 'k-i-lock' },
    { text: 'Citas de atención', icon: 'k-i-calendar' }, { separator: true },
    { text: 'Cerrar sesión', icon: 'k-i-logout' }
  ];

  constructor(private courseService: CourseService, private route: ActivatedRoute,
    private fb: FormBuilder, private studentService: StudentServiceService,
    private professorService: ProfessorService) { 
      this.repliesPublicConsultationForm = this.fb.group({
        repliesForm: ['', [Validators.required]]
      })

      this.publicConsultationForm = this.fb.group({
        addPublicConsultationForm: ['', [Validators.required]]
      })
    }

  ngOnInit(): void {
    this.getStudents();
    this.getprofessors();
    this.getPublicConsultation();
    this.getStudentById();
    this.getCourses();
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
  }

  courseChange(value) {
    this.selectedCourse = value;
  }

  getPublicConsultation() {
    this.publicConsultation= [];

    this.studentCourses= [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((result: {}) => {
      this.studentCourses = result;
      
      this.studentCourses.forEach(s => {
        this.publicConsult = {
          "courseId": s.course_id,
          "professorId": s.professor_id
        };
      });

      this.courseService.getPublicConsultation(this.publicConsult).subscribe((result: {}) => {
        this.publicConsultation = result;
      });
    });
  }


  getCourseById(id) {
    this.courseService.getCourseById(id).subscribe((data: {}) => {
      this.course = data;
    });
  }

  getStudentById(){
    this.studentService.getStudentById(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.student = data;
    });
  }

  getStudents() {
    this.students = [];
    this.studentService.getStudents().subscribe((data: {}) => {
      this.students = data;
    });
  }

  getprofessors() {
    this.professors = [];
    this.professorService.getProfessors().subscribe((data: {}) => {
      this.professors = data;
    });
  }

  getCourses() {
    this.courses = [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.courses = data;
    });
  }

  showRepliesPublicConsultation(id) {
    this.show = true;
    this.repliesPublicConsultation = [];
    this.courseService.getRepliesPublicConsultation(id).subscribe((data: {}) => {
      this.repliesPublicConsultation = data;
    });
    this.currentPublicConsultation = id;
  }

  addPublicConsultation() {
    if (!this.publicConsultationForm.valid) {
      return;
    }

    var publicConsultation = {}

    this.date = new Date();
    var dd = this.date.getDate();
    var mm = this.date.getMonth() + 1;
    var yyyy = this.date.getFullYear();

    this.courseService.getProfessorByIdCourse(this.selectedCourse.course_id).subscribe((data: {}) => {
      this.professorCourse = data;

      publicConsultation = {
        "courseId": this.selectedCourse.course_id,
        "studentId": this.route.snapshot.params['id'],
        "professorId": this.professorCourse.id,
        "motive": this.publicConsultationForm.value.addPublicConsultationForm,
        "dateTime": yyyy + '-' + mm + '-' + dd
      };

      this.courseService.addPublicConsultation(publicConsultation).subscribe((result) => {
        this.getPublicConsultation();
      });
    });
  }

  addRepliesPublicConsultation(id) {

    if (!this.repliesPublicConsultationForm.valid) {
      return;
    }

    this.date = new Date();
    var dd = this.date.getDate();
    var mm = this.date.getMonth() + 1;
    var yyyy = this.date.getFullYear();

    var replies = {}

    replies = {
      "publicConsultationId": id,
      "studentId": this.route.snapshot.params['id'],
      "motive": this.repliesPublicConsultationForm.value.repliesForm,
      "dateTime": yyyy+'-'+mm+'-'+dd
    };

    this.courseService.addRepliesPublicConsultation(replies).subscribe((result) => {
      this.showRepliesPublicConsultation(id);
    });
  }


  get repliesForm() { return this.repliesPublicConsultationForm.get('repliesForm'); }
  get addPublicConsultationForm() { return this.publicConsultationForm.get('addPublicConsultationForm'); }
}
