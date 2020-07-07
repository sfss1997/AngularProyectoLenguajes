import { Component, OnInit, ViewChild} from '@angular/core';
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
    { text: 'Perfil', icon: 'k-i-user', selected: true  },
    { text: 'Noticias', icon: 'k-i-form-element'},
    { text: 'Cursos', icon: 'k-i-change-manually' },
    { text: 'Consulta pública', icon: 'k-i-unlock' }, 
    { text: 'Consulta privada', icon: 'k-i-lock' },
    { text: 'Citas de atención', icon: 'k-i-calendar' }, { separator: true },
    { text: 'Cerrar sesión', icon: 'k-i-logout' },
    { text: 'Borrar cuenta', icon: 'k-i-delete' }
  ];

  //NEWS
  @ViewChild('sv') private scrollView;
  public paused = false;
  public width: string = "100%";
  public height: string = "300px";
  public itemsNews:any = [];
  private interval;

  //COURSES
  courseColumns: string[] = ['initials', 'courseName', 'credits', 'professor_name'];
  dataSourceCourses = new MatTableDataSource<any>();
  @ViewChild('firstTable') paginatorCourses: MatPaginator;
  enrolledCourses:any = [];

  //PUBLIC CONSULTATION
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
    }

  ngOnInit(): void {
    this.getStudents();
    this.getprofessors();
    this.getPublicConsultation();
    this.getStudentById();
    this.getCourses();
    this.getEnrolledCourses();
    this.getNews();
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

  //NEWS
  getNews() {
    this.enrolledCourses = [];
    this.restService.getNews().subscribe((data: {}) => {
      this.itemsNews = data;
    });
  }

  public ngAfterViewInit() {
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.scrollView.next();
      }
    }, 4000);
  }

  public ngOnDestroy() {
    clearInterval(this.interval);
  }

  //PROFILE
  editProfile() {

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

  //PUBLIC CONSULTATION
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
      console.log(this.publicConsult);
      this.courseService.getPublicConsultation(this.publicConsult).subscribe((result: {}) => {
        this.publicConsultation = result;
        console.log("hola");
        console.log(this.publicConsultation);
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
