import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';
import { StudentServiceService } from '../student-service.service';
import { LocationService } from '../location.service';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  @Input() studentData = { studentId: 0, name:'', age: 0, nationality: 0, major:0};
  value: Date = new Date(2000, 2, 10);
  provinces: any = [];
  cantons: any = [];
  districts: any = [];

  public selectedProvince: { name: string, id: number};
  public selectedCanton: { name: string, id: number};
  public selectedDistrict: { name: string, id: number};

  public isDisabledCantons: boolean = true;
  public isDisabledDistricts: boolean = true;

  public defaultItemProvinces: { name: string, id: number } = { name: "Select province", id: null };
  public defaultItemCantons: { name: string, id: number } = { name: "Select canton", id: null };
  public defaultItemDistrict: { name: string, id: number } = { name: "Select district", id: null };
  
  constructor(private router: Router, private studentService: StudentServiceService,
    private locationService: LocationService) { }

  ngOnInit(): void {
    this.getProvinces();
  }

  addStudent() {
    this.studentService.addStudent(this.studentData).subscribe((data: {}) => {
      console.log(data);
      this.router.navigate(['/home']);
    });
  }

  getProvinces() {
    this.locationService.getProvinces().subscribe((data: {}) => {
      this.provinces = data;
    });
  }

  getCantons(id) {
    this.locationService.getCantonsByIdProvince(id).subscribe((data: {}) => {
      this.cantons = data;
      console.log(data);
    });
  }

  getDistricts(id) {
    this.locationService.getDistrictsByIdCanton(id).subscribe((data: {}) => {
      this.districts = data;
      console.log(data);
    });
  }

  provinceChange(value) {
    this.selectedProvince = value;
    this.selectedCanton= undefined;
    this.selectedDistrict= undefined;

    if (value.id == this.defaultItemProvinces.id) {
      this.isDisabledCantons = true;
      this.cantons = [];
    } else {
      this.isDisabledCantons = false;
      this.cantons = this.getCantons(value.id);
    }

    this.isDisabledDistricts = true;
    this.districts = [];

  }

  cantonsChange(value) {
    this.selectedCanton = value;
    this.selectedDistrict = undefined;

    if (value.id == this.defaultItemCantons.id) {
      this.isDisabledDistricts = true;
      this.districts = [];
    } else {
      this.isDisabledDistricts = false;
      this.districts = this.getDistricts(value.id);
    }
  }

  districtChange(value) {
    this.selectedDistrict = value;
  }

}
