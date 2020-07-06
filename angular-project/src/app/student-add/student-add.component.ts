import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { StudentServiceService } from '../student-service.service';
import { LocationService } from '../location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  @Input() studentData = { studentCard: '', studentName: '', lastName:'', mail: '', username: '', password:''};
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
    private locationService: LocationService,  public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getProvinces();
  }

  addStudent() {

    var yy = this.value.getFullYear();
    var mm = this.value.getUTCMonth()+1;
    var dd = this.value.getUTCDate();
    var date = yy+'-'+mm+'-'+dd;

    var student = {
      "studentCard": this.studentData.studentCard,
      "username": this.studentData.username,
      "password": this.studentData.password,
      "isAdministrator": 0,
      "status": 'Activo',
      "studentName": this.studentData.studentName,
      "lastName": this.studentData.lastName,
      "birthday": date,
      "mail": this.studentData.mail,
      "provinceId": this.selectedProvince.id,
      "cantonId": this.selectedCanton.id,
      "districtId": this.selectedDistrict.id,
      "registrationStatus": "En espera"
  };

    this.studentService.addStudent(student).subscribe((data: {}) => {
      this.openSnackBar('Estudiante registrado', '');
      this.router.navigate(['/home']);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
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
