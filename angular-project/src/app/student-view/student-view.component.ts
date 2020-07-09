import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { CourseService } from '../course.service';
import { StudentServiceService } from '../student-service.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfessorService } from '../professor.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})

export class StudentViewComponent implements OnInit {

  //START
  public selected = 'Perfil';
  public items: Array<DrawerItem> = [
    { text: 'Perfil', icon: 'k-i-user', selected: true },
    { text: 'Noticias', icon: 'k-i-form-element' },
    { text: 'Cursos', icon: 'k-i-change-manually' },
    { text: 'Consulta pública', icon: 'k-i-unlock' },
    { text: 'Consulta privada', icon: 'k-i-lock' },
    { text: 'Citas de atención', icon: 'k-i-calendar' }, { separator: true },
    { text: 'Cerrar sesión', icon: 'k-i-logout' },
    { text: 'Borrar cuenta', icon: 'k-i-delete' }
  ];

  //PROFILE
  uploadSaveUrl = './assets/';
  uploadRemoveUrl = 'removeUrl';
  public socialNetworksStudent: any = [];
  public listSocialNetworks: any = [];
  public selectedSocialNetworks: { name: string, id: number };
  public defaultItemSocialNetworks: { name: string, id: number } = { name: "Seleccione", id: null };
  public addSocialNetworkForm: FormGroup;

  //NEWS
  @ViewChild('sv') private scrollView;
  public paused = false;
  public width: string = "100%";
  public height: string = "350px";
  public itemsNews: any = [];
  public comments: any = [];
  private interval;
  @Input() commentData = { comment: '' };
  public currentNews: any;
  public currentNewsName: any;

  //COURSES
  courseColumns: string[] = ['initials', 'courseName', 'credits', 'professor_name'];
  enrolledCourses: any = [];
  @ViewChild(MatPaginator, { static: true }) paginatorCourses: MatPaginator;
  dataSourceCourses = new MatTableDataSource<any>();
  public listEnrollCourse: any = [];
  public selectedEnrollCourse: { name: string, id: number };
  public defaultItemEnrollCourse: { name: string, id: number } = { name: "Seleccione", id: null };
  public isDisabledProfessor: boolean = true;
  public professorsList: any = [];

  public listProfessor: Array<any> = [];
  public selectedProfessor: { name: string, id: number };
  public defaultItemProfessor: { name: string, id: number } = { name: "Seleccione", id: null };

  //PUBLIC CONSULTATION
  public studentCourses: any = [];
  public selectedCourse: { courseName: string, course_id: number };
  public defaultItemCourse: { courseName: string, course_id: number } = { courseName: "Seleccione un curso", course_id: null };
  publicConsultation: any = [];
  repliesPublicConsultation: any = [];
  showPublicConsultation = false;
  repliesPublicConsultationForm: FormGroup;
  publicConsultationForm: FormGroup;
  date: any;
  course: any;
  student: any;
  studentPublicConsultation: any;
  students: any = [];
  professors: any = [];
  courses: any = [];
  professorCourse: any;
  currentPublicConsultation: any = {};
  publicConsult: any = { courseId: 0, professorId: 0 };

  //PRIVATE CONSULTATION
  public showPrivateConsultation = false;
  public listPrivateConsultation: any = [];
  public privateConsultation: any = [];
  public repliesPrivateConsultation: any = [];
  public currentPrivateConsultation: any = {};
  public repliesPrivateConsultationForm: FormGroup;
  public privateConsultationForm: FormGroup;

  //APPOINTMENT
  public listAppointment: any = [];
  public appointmentForm: FormGroup;

  constructor(private courseService: CourseService, private route: ActivatedRoute,
    private fb: FormBuilder, private studentService: StudentServiceService,
    private professorService: ProfessorService, private router: Router,
    public snackBar: MatSnackBar, private restService: RestService) {

    this.repliesPublicConsultationForm = this.fb.group({
      repliesForm: ['', [Validators.required]]
    })

    this.publicConsultationForm = this.fb.group({
      addPublicConsultationForm: ['', [Validators.required]]
    })

    this.repliesPrivateConsultationForm = this.fb.group({
      repliesPrivate: ['', [Validators.required]]
    })

    this.privateConsultationForm = this.fb.group({
      addPrivateConsultationForm: ['', [Validators.required]]
    })

    this.appointmentForm = this.fb.group({
      appointment: ['', [Validators.required]]
    })

    this.addSocialNetworkForm = this.fb.group({
      urlSocialNetwork: ['', [Validators.required]]
    })
  }

  //START
  ngOnInit(): void {
    this.getStudents();
    this.getprofessors();
    this.getPublicConsultation();
    this.getStudentById();
    this.getCourses();
    this.getEnrolledCourses();
    this.getNews();
    this.getPrivateConsultation();
    this.getAppointment();
    this.getSocialNetworks();
    this.getSocialNetworksCatalog();
    this.getListCourses();
  }

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
    if (this.selected == 'Cerrar sesión') {
      this.openSnackBar('Se ha cerrado la sesión.', '');
      this.router.navigate(['/home']);
    }
    if (this.selected == 'Borrar cuenta') {
      this.studentService.deleteStudent(this.route.snapshot.params['id']).subscribe(res => {
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
    }, 10000);
  }

  public ngOnDestroy() {
    clearInterval(this.interval);
  }

  //PROFILE
  getSocialNetworks() {
    this.socialNetworksStudent = [];
    this.studentService.getSocialNetworksById(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.socialNetworksStudent = data;
    });
  }

  getSocialNetworksCatalog() {
    this.listSocialNetworks = [];
    this.studentService.getListSocialNetworksCatalog().subscribe((data: {}) => {
      this.listSocialNetworks = data;
    });
  }

  socialNetworksChange(value) {
    this.selectedSocialNetworks = value;
  }

  addSocialNetwork() {
    if (!this.addSocialNetworkForm.valid) {
      return;
    }

    var socialNetwork = {
      "userId": this.route.snapshot.params['id'],
      "url": this.addSocialNetworkForm.value.urlSocialNetwork,
      "socialNetworksNameId": this.selectedSocialNetworks.id
    };

    this.studentService.addSocialNetwork(socialNetwork).subscribe((data: {}) => {
      this.openSnackBar('Red social añadida', '');
      this.getSocialNetworks();
    });
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
      'authorName': this.student.studentName + ' ' + this.student.lastName,
      'text': this.commentData.comment,
      'dateTime': yyyy + '-' + mm + '-' + dd,
      'newsId': this.currentNews
    };

    this.restService.addComment(comment).subscribe((data: {}) => {
      this.openSnackBar('Comentario añadido', '');
      this.getComments(this.currentNews);
    });

  }

  //COURSES
  getEnrolledCourses() {
    this.enrolledCourses = [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.enrolledCourses = data;
      this.dataSourceCourses = new MatTableDataSource<any>(this.enrolledCourses);
      this.dataSourceCourses.paginator = this.paginatorCourses;
    });
  }

  enrollCourse() {
    var studentCourse = {
      "userId": this.route.snapshot.params['id'],
      "courseId": this.selectedEnrollCourse.id
    }

    this.studentService.addStudentCourse(studentCourse).subscribe((result) => {
      this.getEnrolledCourses();
      this.getCourses();
    });
  }

  enrollCourseChange(value) {
    this.selectedEnrollCourse = value;
    this.selectedProfessor = undefined;

    if (value.id == this.defaultItemEnrollCourse.id) {
      this.isDisabledProfessor = true;
      this.listProfessor = [];
    } else {
      this.isDisabledProfessor = false;
      this.getProfessor(value.id);
    }
  }

  getProfessor(id) {
    this.courseService.getProfessorByIdCourse(id).subscribe((data: {}) => {
      this.professorsList = data;
      this.listProfessor.push(this.professorsList);
    });
  }

  getListCourses() {
    this.courseService.getCourses().subscribe((data: {}) => {
      this.listEnrollCourse = data;
    });
  }

  professorChange(value) {
    this.selectedSocialNetworks = value;
  }

  //PUBLIC CONSULTATION
  courseChange(value) {
    this.selectedCourse = value;
  }

  getPublicConsultation() {
    this.publicConsultation = [];

    this.studentCourses = [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((result: {}) => {
      this.studentCourses = result;

      this.studentCourses.forEach(s => {
        this.publicConsult = {
          "courseId": s.course_id,
          "professorId": s.professor_id
        };

        this.courseService.getPublicConsultation(this.publicConsult).subscribe((result: {}) => {
          this.publicConsultation = result;
        });
      });
    });
  }


  getCourseById(id) {
    this.courseService.getCourseById(id).subscribe((data: {}) => {
      this.course = data;
    });
  }

  getStudentById() {
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
    this.showPublicConsultation = true;
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
      "dateTime": yyyy + '-' + mm + '-' + dd
    };

    this.courseService.addRepliesPublicConsultation(replies).subscribe((result) => {
      this.showRepliesPublicConsultation(id);
    });
  }

  //PRIVATE CONSULTATION
  getPrivateConsultation() {
    this.listPrivateConsultation = [];
    this.privateConsultation = [];
    var privateConsult = {};

    this.studentCourses = [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((result: {}) => {
      this.studentCourses = result;

      this.studentCourses.forEach(s => {
        privateConsult = {
          "courseId": s.course_id,
          "professorId": s.professor_id
        };

        this.courseService.getPrivateMessage(privateConsult).subscribe((result: {}) => {
          this.listPrivateConsultation = result;
          this.listPrivateConsultation.forEach(p => {
            if (p.student_id == this.route.snapshot.params['id']) {
              this.privateConsultation = this.listPrivateConsultation;
            }
          });
        });
      });
    });
  }

  showRepliesPrivateConsultation(id) {
    this.showPrivateConsultation = true;
    this.repliesPrivateConsultation = [];
    this.courseService.getRepliesPrivateMessage(id).subscribe((data: {}) => {
      this.repliesPrivateConsultation = data;
    });
    this.currentPrivateConsultation = id;

  }

  addPrivateConsultation() {
    if (!this.privateConsultationForm.valid) {
      return;
    }

    var privateConsultation = {}

    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1;
    var yyyy = date.getFullYear();

    this.courseService.getProfessorByIdCourse(this.selectedCourse.course_id).subscribe((data: {}) => {
      this.professorCourse = data;

      privateConsultation = {
        "courseId": this.selectedCourse.course_id,
        "studentId": this.route.snapshot.params['id'],
        "professorId": this.professorCourse.id,
        "motive": this.privateConsultationForm.value.addPrivateConsultationForm,
        "dateTime": yyyy + '-' + mm + '-' + dd
      };

      this.courseService.addPrivateMessage(privateConsultation).subscribe((result) => {
        this.getPrivateConsultation();
      });
    });
  }

  addRepliesPrivateConsultation(id) {
    if (!this.repliesPrivateConsultationForm.valid) {
      return;
    }

    this.date = new Date();
    var dd = this.date.getDate();
    var mm = this.date.getMonth() + 1;
    var yyyy = this.date.getFullYear();

    var replies = {}

    replies = {
      "privateMessageId": id,
      "studentId": this.route.snapshot.params['id'],
      "motive": this.repliesPrivateConsultationForm.value.repliesPrivate,
      "dateTime": yyyy + '-' + mm + '-' + dd
    };

    this.courseService.addRepliesPrivateMessage(replies).subscribe((result) => {
      this.showRepliesPrivateConsultation(id);
    });
  }

  //APPOINTMENT
  getAppointment() {
    this.listAppointment = [];
    var appointment = {};

    this.studentCourses = [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((result: {}) => {
      this.studentCourses = result;

      this.studentCourses.forEach(s => {
        appointment = {
          "courseId": s.course_id,
          "professorId": s.professor_id,
          "studentId": this.route.snapshot.params['id']
        };

        this.courseService.getAppointment(appointment).subscribe((result: {}) => {
          this.listAppointment = result;
        });
      });
    });
  }

  addAppointment() {
    if (!this.appointmentForm.valid) {
      return;
    }

    this.date = new Date();
    var dd = this.date.getDate();
    var mm = this.date.getMonth() + 1;
    var yyyy = this.date.getFullYear();

    var appointment = {}

    this.studentCourses = [];
    this.courseService.getStudentCourses(this.route.snapshot.params['id']).subscribe((result: {}) => {
      this.studentCourses = result;

      this.studentCourses.forEach(s => {
        if (s.course_id == this.selectedCourse.course_id) {
          appointment = {
            "courseId": this.selectedCourse.course_id,
            "studentId": this.route.snapshot.params['id'],
            "Accepted": 2,
            "professorId": s.professor_id,
            "motive": this.appointmentForm.value.appointment,
            "dateTime": yyyy + '-' + mm + '-' + dd
          };
        }
      });

      this.courseService.addAppointment(appointment).subscribe((result) => {
        this.openSnackBar('Solicitud de cita enviada', '');
        this.getAppointment();
      });
    });

  }


  get repliesForm() { return this.repliesPublicConsultationForm.get('repliesForm'); }
  get addPublicConsultationForm() { return this.publicConsultationForm.get('addPublicConsultationForm'); }
  get repliesPrivate() { return this.repliesPrivateConsultationForm.get('repliesPrivate'); }
  get addPrivateConsultationForm() { return this.privateConsultationForm.get('addPrivateConsultationForm'); }
  get appointment() { return this.appointmentForm.get('appointment'); }
}
