import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  public value: Date = new Date(2000, 2, 10);
  public listItems: Array<string> = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  addStudent() {
    this.router.navigate(['/home']);
  }

}
