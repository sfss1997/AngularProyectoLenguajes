import { Component, OnInit, Input} from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CourseService } from '../course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent implements OnInit {

  public selected = 'Perfil';

  public studentCourses:any = [];
  publicConsultation:any = [];
  repliesPublicConsultation:any = [];
  show = false;

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

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPublicConsultation();
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
  }

  getPublicConsultation() {
    this.studentCourses = [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.studentCourses = data;

      this.studentCourses.forEach(s => {
        this.publicConsult = {
          "courseId": s.course_id,
          "professorId": s.professor_id
        };
        this.publicConsultation = [];
        this.courseService.getPublicConsultation(this.publicConsult).subscribe((data: {}) => {
          this.publicConsultation = data;
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
    this.replies = {

    };

    this.courseService.addRepliesPublicConsultation(this.replies);
  }

}
