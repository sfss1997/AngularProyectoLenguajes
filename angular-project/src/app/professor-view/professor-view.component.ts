import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CourseService } from '../course.service';
import { ProfessorService } from '../professor.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StudentServiceService } from '../student-service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-professor-view',
  templateUrl: './professor-view.component.html',
  styleUrls: ['./professor-view.component.css']
})
export class ProfessorViewComponent implements OnInit {

  //START
  public selected = 'Perfil';
  public items: Array<DrawerItem> = [
    { text: 'Perfil', icon: 'k-i-user', selected: true  },
    { text: 'Noticias', icon: 'k-i-form-element'},
    { text: 'Cursos', icon: 'k-i-change-manually' },
    { text: 'Consulta pública', icon: 'k-i-unlock' }, 
    { text: 'Consulta privada', icon: 'k-i-lock' },
    { text: 'Citas de atención', icon: 'k-i-calendar' }, { separator: true },
    { text: 'Cerrar sesión', icon: 'k-i-logout' },
    { text: 'Borrar cuenta', icon: 'k-i-delete' }
  ];

  //PROFILE

  //NEWS
  @ViewChild('sv') private scrollView;
  public paused = false;
  public width: string = "100%";
  public height: string = "350px";
  public itemsNews:any = [];
  public comments:any = [];
  private interval;
  @Input() commentData = { comment: ''};
  public currentNews:any;
  public currentNewsName:any;

  //COURSES

  //PUBLIC CONSULTATION
  public professorCourses:any = [];
  publicConsultation:any = [];
  repliesPublicConsultation:any = [];
  show = false;
  repliesPublicConsultationForm: FormGroup;
  date:any;
  course:any;
  professor:any;
  studentPublicConsultation:any;
  currentPublicConsultation:any = {};

  replies: any = { publicConsultationId: 0, studentId: 0, professorId: 0, motive: '', dateTime: ''}
  publicConsult:any = { courseId: 0, professorId: 0};

  constructor(private courseService: CourseService, private route: ActivatedRoute,
    private fb: FormBuilder, private professorService: ProfessorService,
    private studentService: StudentServiceService, private router: Router, public snackBar: MatSnackBar, private restService: RestService) { 
      this.repliesPublicConsultationForm = this.fb.group({
        repliesForm: ['', [Validators.required]]
      })
    }

  //START
  ngOnInit(): void {
    this.getPublicConsultation();
    this.getProfessorById();
    this.getNews();
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
    if (this.selected == 'Cerrar sesión') {
      this.openSnackBar('Se ha cerrado la sesión.', '');
      this.router.navigate(['/home']);
    }

    if (this.selected == 'Borrar cuenta') {
      this.professorService.deleteProfessor(this.route.snapshot.params['id']).subscribe(res => {
      });
      this.openSnackBar('Se ha borrado la cuenta.', '');
      this.router.navigate(['/home']);
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  public ngAfterViewInit() {
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.scrollView.next();
      }
    }, 8000);
  }

  public ngOnDestroy() {
    clearInterval(this.interval);
  }

  //PROFILE
  editProfile() {
    
  }

  //NEWS
  getNews() {
    this.itemsNews = [];
    this.restService.getNews().subscribe((data: {}) => {
      this.itemsNews = data;
    });
  }

  getComments(id) {
    this.currentNews = id;
    this.itemsNews.forEach(n => {
      if (n.id == id) {
        this.currentNewsName = n.title;
      } 
    });

    this.comments = [];
    this.restService.getCommentsByIdNews(id).subscribe((data: {}) => {
      this.comments = data;
    });
  }

  addComment() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    var comment = {
      'authorId': this.route.snapshot.params['id'],
      'authorName': this.professor.name + ' ' + this.professor.lastName,
      'text': this.commentData.comment,
      'dateTime': yyyy + '-' + mm + '-' + dd,
      'newsId': this.currentNews
    };

    this.restService.addComment(comment).subscribe((data: {}) => {
      this.openSnackBar('Comentario añadido', '');
      this.getComments(this.currentNews);
    });

  }

  //PUBLIC CONSULTATION
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
    this.currentPublicConsultation = id;
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
      "professorId": this.route.snapshot.params['id'],
      "motive": this.repliesPublicConsultationForm.value.repliesForm,
      "dateTime": yyyy+'-'+mm+'-'+dd
    };

    console.log(replies);

    this.courseService.addRepliesPublicConsultation(replies).subscribe((result) => {
      this.showRepliesPublicConsultation(id);
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
