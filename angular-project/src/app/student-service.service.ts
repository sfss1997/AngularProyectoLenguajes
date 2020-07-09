import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  } from '@angular/common/http';
import { Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {

  private _url = 'http://localhost:8080/Student/';
  
  constructor(private http: HttpClient) { }

  getStudents(): Observable<any> {
    return this.http.get<any>(this._url + 'ListAll');
  }

  getStudentById(id): Observable<any> {
    return this.http.get<any>(this._url + 'getById?id=' +id);
  }

  getListApproval(): Observable<any> {
    return this.http.get<any>(this._url + 'ListApproval');
  }

  getListSocialNetworksCatalog(): Observable<any> {
    return this.http.get<any>(this._url + 'ListSocialNetworksCatalog');
  }

  getSocialNetworksById(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetSocialNetworksById?id=' + id);
  }

  addStudent (student): Observable<any> {
    return this.http.post(this._url + 'Add', JSON.stringify(student), httpOptions);
  }

  updateStudent (student): Observable<any> {
    return this.http.put(this._url + 'Update', JSON.stringify(student), httpOptions);
  }

  deleteStudent (id): Observable<any> {
    return this.http.delete(this._url + 'Delete?id='+ id, httpOptions);
  }

  addStudentCourse (studentCourse): Observable<any> {
    return this.http.post(this._url + 'AddCourse', JSON.stringify(studentCourse), httpOptions);
  }

  updateImage (image): Observable<any> {
    return this.http.put(this._url + 'UpdateImage', JSON.stringify(image), httpOptions);
  }

  addSocialNetwork (socialNetwork): Observable<any> {
    return this.http.post(this._url + 'AddSocialNetwork', JSON.stringify(socialNetwork), httpOptions);
  }

  approvalStudent (id): Observable<any> {
    return this.http.put(this._url + 'Approval?id='+ id, httpOptions);
  }

  denyStudent (id): Observable<any> {
    return this.http.put(this._url + 'Deny?id='+ id, httpOptions);
  }
}
