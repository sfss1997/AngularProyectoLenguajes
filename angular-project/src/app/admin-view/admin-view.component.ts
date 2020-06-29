import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { RestService } from '../rest.service';
import { StudentServiceService } from '../student-service.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  public gridComments: any;
  public gridNews: any;

  news:any = [];
  comments:any = [];
  new:any;
  newsName:any;
  students:any = [];
  studentsApproval:any = [];
  student:any;
  studentStatus:any = { id: 0, registrationStatus:''};

  studentApprovalColumns: string[] = ['student_card', 'student_name', 'last_name', 'mail', 'actions'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  dataSourcestudentsApproval = new MatTableDataSource<any>();

  constructor(public rest:RestService, private router: Router,
    private studentService: StudentServiceService) { }

  ngOnInit(): void {
    this.getNews();
    this.getComments();
    this.getStudents();
    this.getStudentsApproval();
  }

  getNews() {
    this.news = [];
    this.rest.getNews().subscribe((data: {}) => {
      this.news = data;
      this.gridNews = data;
    });
  }

  getComments() {
    this.comments = [];
    this.rest.getComments().subscribe((data: {}) => {
      this.comments = data;
      this.gridComments = data;
      this.comments.forEach(c => {
        this.getNewsById(c.newsId);
      });
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
      this.dataSourcestudentsApproval.paginator = this.paginator;
    });
  }

  approveStudent(id) {
    this.studentStatus = {
        "id": id,
        "registrationStatus": "Aprobado"
      };

    this.studentService.updateStatus(this.studentStatus).subscribe((result) => {
      this.getStudentsApproval();
    });
  }

  denyStudent(id) {
    this.studentStatus = {
        "id": id,
        "registrationStatus": "Rechazado"
      };

    this.studentService.updateStatus(this.studentStatus).subscribe((result) => {
      this.getStudentsApproval();
    });
  }

}
