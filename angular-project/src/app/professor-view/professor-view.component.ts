import { Component, OnInit } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CourseService } from '../course.service';
import { ProfessorService } from '../professor.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentServiceService } from '../student-service.service';

@Component({
  selector: 'app-professor-view',
  templateUrl: './professor-view.component.html',
  styleUrls: ['./professor-view.component.css']
})
export class ProfessorViewComponent implements OnInit {

  public selected = 'Perfil';
  public professorCourses:any = [];
  publicConsultation:any = [];
  repliesPublicConsultation:any = [];
  show = false;
  repliesPublicConsultationForm: FormGroup;
  date:any;
  course:any;
  professor:any;
  studentPublicConsultation:any;

  replies: any = { publicConsultationId: 0, studentId: 0, professorId: 0, motive: '', dateTime: ''}
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
    private fb: FormBuilder, private professorService: ProfessorService,
    private studentService: StudentServiceService) { 
      this.repliesPublicConsultationForm = this.fb.group({
        repliesForm: ['', [Validators.required]]
      })
    }

  ngOnInit(): void {
    this.getPublicConsultation();
    this.getProfessorById();
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
  }

  getPublicConsultation() {
    this.professorCourses = [];
    this.courseService.getProfessorCourses(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.professorCourses = data;

      this.professorCourses.forEach(p => {
        this.publicConsult = {
          "courseId": p.course_id,
          "professorId": p.professor_id
        };
        this.publicConsultation = [];
        this.courseService.getPublicConsultation(this.publicConsult).subscribe((result: {}) => {
          this.publicConsultation = result;

          this.publicConsultation.forEach(p => {
            this.studentService.getStudentById(p.student_id).subscribe((student: {}) => {
              this.studentPublicConsultation = student;
            });
          });
        });
      });

    });
  }

  showRepliesPublicConsultation(id) {
    this.show = true;
    this.repliesPublicConsultation = [];
    this.courseService.getRepliesPublicConsultation(id).subscribe((data: {}) => {
      this.repliesPublicConsultation = data;
    });
  }

  addRepliesPublicConsultation() {

    if (!this.repliesPublicConsultationForm.valid) {
      return;
    }

    this.date = new Date();
    var dd = this.date.getDate();
    var mm = this.date.getMonth() + 1;
    var yyyy = this.date.getFullYear();

    var publicConsultationId = 0;

    this.repliesPublicConsultation.forEach(r => {
      publicConsultationId = r.publicConsultation_id;
    });

    this.replies = {
      "publicConsultationId": publicConsultationId,
      "professorId": this.route.snapshot.params['id'],
      "motive": this.repliesPublicConsultationForm.value.repliesForm,
      "dateTime": yyyy+'-'+mm+'-'+dd
    };

    this.courseService.addRepliesPublicConsultation(this.replies).subscribe((result) => {
      this.showRepliesPublicConsultation(this.replies.publicConsultationId);
    });
  }

  getCourseById(id) {
    this.courseService.getCourseById(id).subscribe((data: {}) => {
      this.course = data;
    });
  }

  getProfessorById() {
    this.professorService.getProfessorById(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.professor = data;
    });
  }

  get repliesForm() { return this.repliesPublicConsultationForm.get('repliesForm'); }

}
