import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../student-service.service';
import { ProfessorService } from '../professor.service';
import { UserService } from '../user.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  @Input() user = { username: '', password:''};
  students:any = [];
  professors:any = [];
  users:any = [];

  constructor(private fb: FormBuilder,private router: Router, private studentService: StudentServiceService, 
    private professorService: ProfessorService, private userService: UserService, public snackBar: MatSnackBar) { 


      this.loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      })
    }


    
  ngOnInit(): void {
    this.getUsers();
    this.getStudents();
    this.getProfessors();
  }



  login() {
    this.users.forEach(u => {
      if(u.username == this.user.username && u.password == this.user.password && u.status == 'Activo') {
        this.students.forEach(s => {
          if(s.id == u.id) {
            this.router.navigate(['/student-view', s.id]);
          }
        });
        this.professors.forEach(p => {
          if(p.id == u.id) {
            this.router.navigate(['/professor-view', p.id]);
          }
        });
      }
    });

    if(this.user.username == 'admin' && this.user.password == 'admin') {
      this.router.navigate(['/admin-view', 1]);
    } 
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getStudents() {
    this.students = [];
    this.studentService.getStudents().subscribe((data: {}) => {
      this.students = data;
    });
  }

  getProfessors() {
    this.professors = [];
    this.professorService.getProfessors().subscribe((data: {}) => {
      this.professors = data;
    });
  }

  getUsers() {
    this.users= [];
    this.userService.getUsers().subscribe((data: {}) => {
      this.users = data;
    });
  }

}
