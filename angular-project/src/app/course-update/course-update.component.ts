import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-update',
  templateUrl: './course-update.component.html',
  styleUrls: ['./course-update.component.css']
})
export class CourseUpdateComponent implements OnInit {

  courseForm: FormGroup;
  course= {};
  @Input() courseData: any = { id: 0, initials:'', name: '', is_active: 0, credits:0, cycle:''};
  public selectedState: { text: string, value: number};
  public selectedCycles: { text: string, value: number};
  constructor(private fb: FormBuilder,private courseService: CourseService, private route: ActivatedRoute, private router: Router) {  
    

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
    this.courseService.getCourseById(this.route.snapshot.params['id']).subscribe((data: {}) => { 
      this.courseData = data;  
      console.log(this.courseData);
    });
  }

  public cycles: Array<any> = [
    { text: 'I Semestre', value: 1 },
    { text: 'II Semestre', value: 2 },
    { text: 'Verano', value: 3 }
];

public is_active: Array<any> = [
  { text: 'Activo', value: 1 },
  { text: 'Inactivo', value: 0 }
];

updateCourse() {
  if (!this.courseForm.valid) {
    return;
  }
  this.course = {
    "id": this.courseForm.value.id,
    "initials": this.courseForm.value.initials,
    "name": this.courseForm.value.name,
    "isActive": this.selectedState.value,
    "credits": this.courseForm.value.credits,
    "cycle": this.selectedCycles.value
  };

   this.courseService.update(this.course).subscribe((result) => { 
    this.router.navigate(['/admin-view', 1]);
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