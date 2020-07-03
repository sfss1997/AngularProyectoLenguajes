import { Component, OnInit, Input } from '@angular/core';
import { LocationService } from '../location.service';
import { ProfessorService } from '../professor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-professor-update',
  templateUrl: './professor-update.component.html',
  styleUrls: ['./professor-update.component.css']
})

export class ProfessorUpdateComponent implements OnInit {


  @Input() profesorData:any = {name:'', lastName:'', mail:'', academicDegree:0, username:'', password:'', isAdministrator:0,status:'',provinceId:0,cantonId:0,districtId:0};

  provinces: any = [];
  cantons: any = [];
  districts: any = [];
  academicDegrees: any = [];

  selectedProvince: { name: string, id: number};
  selectedCanton: { name: string, id: number};
  selectedDistrict: { name: string, id: number};
  selectedAcademicDegree: { name: string, id: number};
  selectedAdministrator: { name: string, id: number};
  selectedStatus: { name: string, id: number};

  isDisabledCantons: boolean = true;
  isDisabledDistricts: boolean = true;

  defaultItemProvinces: { name: string, id: number } = { name: "Select province", id: null };
  defaultItemCantons: { name: string, id: number } = { name: "Select canton", id: null };
  defaultItemDistrict: { name: string, id: number } = { name: "Select district", id: null };


  public is_admin: Array<any> = [
    { name: 'Si', id: 1 },
    { name: 'No', id: 0 }
  ];

  public status: Array<any> = [
    { name: 'Activo', id: 1 },
    { name: 'Inactivo', id: 0 }
  ];
  
  constructor(private route: ActivatedRoute, private locationService: LocationService, private professorService: ProfessorService) { }


  ngOnInit(): void {
    this.professorService.getProfessorById(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.profesorData=data;
    });

    this.getProvinces();
    this.getAcademicDregree();
  }

  degreeChange(value) {
    this.selectedAcademicDegree = value;
  }
  administratorChange(value) {
    this.selectedAdministrator = value;
  }

  statusChange(value) {
    this.selectedStatus = value;
  }

  getAcademicDregree(){
    this.academicDegrees = [];
    this.professorService.getAcademicDregrees().subscribe((data: {}) => {
      this.academicDegrees = data;
    });

  }

  updateProfessor(){
   
    var professor = {
      "id": this.route.snapshot.params['id'],
      "username": this.profesorData.username,
      "password": this.profesorData.password,
      "isAdministrator": this.selectedAdministrator.id,
      "status": this.selectedStatus.name,
      "name": this.profesorData.name,
      "lastName": this.profesorData.lastName,
      "mail": this.profesorData.mail,
      "provinceId": this.selectedProvince.id,
      "cantonId": this.selectedCanton.id,
      "districtId": this.selectedDistrict.id,
      "academicDegree": this.selectedAcademicDegree.id
  };
    this.professorService.updateProfessor(professor).subscribe((result) => {});
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
