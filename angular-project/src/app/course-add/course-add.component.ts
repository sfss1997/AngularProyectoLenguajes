import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.css']
})
export class CourseAddComponent implements OnInit {

  courseForm: FormGroup;
  course= {};
  @Input() courseData = { id: 0, initials:'', name: '', is_active: 0, credits:0, cycle:''};
  public selectedState: { text: string, value: number};
  public selectedCycles: { text: string, value: number};
  constructor(private fb: FormBuilder,private courseService: CourseService) {  
    

    this.courseForm = this.fb.group({
      id: 0,
      initials: ['', [Validators.required]],
      name: ['', [Validators.required]],
      credits:new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{1,2}$')
      ])
    })
  }

  ngOnInit(): void {
  }

  public cycles: Array<any> = [
    { text: 'I Semestre', value: 1 },
    { text: 'II Semestre', value: 2 },
    { text: 'Verano', value: 3 }
];

public is_active: Array<any> = [
  { text: 'Activo', value: 1 },
  { text: 'Inactivo', value: 2 }
];

addCourse() {
  if (!this.courseForm.valid) {
    return;
  }
  this.course = {
    "initials": this.courseForm.value.initials,
    "name": this.courseForm.value.name,
    "is_active": this.selectedState.value,
    "credits": this.courseForm.value.credits,
    "cycle": this.selectedCycles.value
  };

   this.courseService.add(this.course).subscribe((result) => { 
  });
}
cycleChange(value) {
  this.selectedCycles = value;
}

is_activeChange(value) {
  this.selectedState = value;
}

  get initials() { return this.courseForm.get('initials'); }
  get name() { return this.courseForm.get('name'); }
  get credits() { return this.courseForm.get('credits'); }


}
