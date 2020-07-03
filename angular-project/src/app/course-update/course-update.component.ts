import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {

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

updateCourse() {
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

   this.courseService.update(this.course).subscribe((result) => { 
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