import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentServiceService } from '../student-service.service';
import { LocationService } from '../location.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-student-update',
  templateUrl: './student-update.component.html',
  styleUrls: ['./student-update.component.css']
})
export class StudentUpdateComponent implements OnInit {

  @Input() studentData:any = { studentName: '', lastName:'', mail: '', username: '', password: ''};
  value: Date = new Date(2000, 2, 10);
  provinces: any = [];
  cantons: any = [];
  districts: any = [];

  public is_admin: Array<any> = [
    { name: 'Si', id: 1 },
    { name: 'No', id: 0 }
  ];

  public status: Array<any> = [
    { name: 'Activo', id: 1 },
    { name: 'Inactivo', id: 0 }
  ];

  public selectedProvince: { name: string, id: number};
  public selectedCanton: { name: string, id: number};
  public selectedDistrict: { name: string, id: number};
  selectedAdministrator: { name: string, id: number};
  selectedStatus: { name: string, id: number};

  public isDisabledCantons: boolean = true;
  public isDisabledDistricts: boolean = true;

  public defaultItemProvinces: { name: string, id: number } = { name: "Seleccione una provincia", id: null };
  public defaultItemCantons: { name: string, id: number } = { name: "Seleccione un cantón", id: null };
  public defaultItemDistrict: { name: string, id: number } = { name: "Seleccione un distrito", id: null };

  constructor(private router: Router, private studentService: StudentServiceService,
    private locationService: LocationService,  public snackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProvinces();
    this.studentService.getStudentById(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.studentData = data;
    });
  }

  updateStudent() {
    var student = {
      "id": this.route.snapshot.params['id'],
      "username": this.studentData.username,
      "password": this.studentData.password,
      "isAdministrator": this.selectedAdministrator.id,
      "status": this.selectedStatus.name,
      "studentName": this.studentData.studentName,
      "lastName": this.studentData.lastName,
      "mail": this.studentData.mail,
      "provinceId": this.selectedProvince.id,
      "cantonId": this.selectedCanton.id,
      "districtId": this.selectedDistrict.id,
      "registrationStatus": "Aprobado"
    };

    this.studentService.updateStudent(student).subscribe((result) => {
      this.router.navigate(['/admin-view']);
      this.openSnackBar('Estudiante actualizado', '');
    });
  }

  administratorChange(value) {
    this.selectedAdministrator = value;
  }

  statusChange(value) {
    this.selectedStatus = value;
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
    });
  }

  getDistricts(id) {
    this.locationService.getDistrictsByIdCanton(id).subscribe((data: {}) => {
      this.districts = data;
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
