import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { StudentServiceService } from '../student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProfessorService } from '../professor.service';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent implements OnInit {

  news:any = [];
  comments:any = [];
  new:any;
  newsName:any;
  students:any = [];
  courses:any = [];
  studentsApproval:any = [];
  professors:any = [];
  student:any;

  studentApprovalColumns: string[] = ['student_card', 'student_name', 'last_name', 'mail', 'actions'];
  professorColumns: string[] = ['name', 'last_name', 'mail', 'actions'];
  courseColumns: string[] = ['initials', 'name', 'is_active', 'credits', 'cycle', 'actions'];
  studentColumns: string[] = ['studentCard', 'studentName', 'lastName', 'mail', 'status', 'actions'];
  newsColumns: string[] = ['dateTime', 'authorName', 'title', 'text', 'actions'];
  commentsColumns: string[] = ['dateTime', 'authorName', 'text', 'newsName', 'actions'];
  
  dataSourcestudentsApproval = new MatTableDataSource<any>();
  dataSourceProfessors = new MatTableDataSource<any>();
  dataSourceCourses = new MatTableDataSource<any>();
  dataSourceStudents = new MatTableDataSource<any>();
  dataSourceNews = new MatTableDataSource<any>();
  dataSourceComments = new MatTableDataSource<any>();

  @ViewChild('firstTable') paginatorStudentsApproval: MatPaginator;
  @ViewChild('secondTable') paginatorProfessors: MatPaginator;
  @ViewChild('thirdTable') paginatorCourses: MatPaginator;
  @ViewChild('fourthTable') paginatorStudents: MatPaginator;
  @ViewChild('fifthTable') paginatorNews: MatPaginator;
  @ViewChild('sixthTable') paginatorComments: MatPaginator;

  constructor(public rest:RestService, private router: Router,
    private studentService: StudentServiceService,
    private professorService: ProfessorService,
    private courseService: CourseService) { }

  ngOnInit(): void {
    this.getNews();
    this.getComments();
    this.getStudents();
    this.getStudentsApproval();
    this.getProfessors();
    this.getCourses();
  }

  getNews() {
    this.news = [];
    this.rest.getNews().subscribe((data: {}) => {
      this.news = data;
      this.dataSourceNews = new MatTableDataSource<any>(this.news);
      this.dataSourceNews.paginator = this.paginatorNews;
    });
  }

  editNews(id) {
    this.router.navigate(['/news-update/', id]);
  }

  deleteNews(id) {
    this.rest.deleteNews(id).subscribe(res => {
      this.getNews();
    });

  }

  getComments() {
    this.comments = [];
    this.rest.getComments().subscribe((data: {}) => {
      this.comments = data;
      this.comments.forEach(c => {
        this.getNewsById(c.newsId);
      });
      this.dataSourceComments = new MatTableDataSource<any>(this.comments);
      this.dataSourceComments.paginator = this.paginatorComments;
    });
  }

  deleteComment(id) {
    this.rest.deleteComment(id).subscribe(res => {
      this.getComments();
    });
  }

  getNewsById(newsId) {
    this.rest.getNewsById(newsId).subscribe((data: {}) => {
      this.new = data;
      this.newsName = this.new.title;
    });
  }

  getStudents() {
    this.students = [];
    this.studentService.getStudents().subscribe((data: {}) => {
      this.students = data;
      this.dataSourceStudents = new MatTableDataSource<any>(this.students);
      this.dataSourceStudents.paginator = this.paginatorStudents;
    });
  }

  getStudentById(id) {
    this.studentService.getStudentById(id).subscribe((data: {}) => {
      this.student = data;
      console.log(data);
    });
  }

  getStudentsApproval() {
    this.studentsApproval = [];
    this.studentService.getListApproval().subscribe((data: {}) => {
      this.studentsApproval = data;
      this.dataSourcestudentsApproval = new MatTableDataSource<any>(this.studentsApproval);
      this.dataSourcestudentsApproval.paginator = this.paginatorStudentsApproval;
    });
  }

  approveStudent(id) {
    this.studentService.approvalStudent(id).subscribe((result) => {
      this.getStudentsApproval();
      this.getStudents();
    });
  }

  denyStudent(id) {
    this.studentService.denyStudent(id).subscribe((result) => {
      this.getStudentsApproval();
      this.getStudents();
    });
  }

  deleteStudent(id) {
    this.studentService.deleteStudent(id).subscribe(res => {
      this.getStudents();
    });
  }

  editStudent(id) {
    this.router.navigate(['/student-update/', id]);
  }

  getProfessors() {
    this.professors = [];
    this.professorService.getProfessors().subscribe((data: {}) => {
      this.professors = data;
      this.dataSourceProfessors = new MatTableDataSource<any>(this.professors);
      this.dataSourceProfessors.paginator = this.paginatorProfessors;
    });
  }

  deleteProfessor(id) {
    console.log(id);
    this.professorService.deleteProfessor(id)
      .subscribe(res => {
          this.getProfessors();
        }
      );
  }

  editProfessor(id) {
    this.router.navigate(['/professor-update/', id]);
  }

  deleteCourse(id) {
    this.courseService.delete(id).subscribe(res => {
          this.getCourses();
        }
      );
  }

  getCourses(){
    this.courses = [];
    this.courseService.getCourses().subscribe((data: {}) => {
      this.courses = data;
      this.dataSourceCourses = new MatTableDataSource<any>(this.courses);
      this.dataSourceCourses.paginator = this.paginatorCourses;
    });
  }

  editCourse(id) {
    this.router.navigate(['/course-update/', id]);
  }

  
}
