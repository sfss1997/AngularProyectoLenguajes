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
export class ProfessorService {

  private _url = 'http://localhost:8080/Professor/';

  constructor(private http: HttpClient) { }

  getProfessors(): Observable<any> {
    return this.http.get<any>(this._url + 'ListAll');
  }

  getProfessorById(id): Observable<any> {
    return this.http.get<any>(this._url + 'getById?id=' +id);
  }

  getListApproval(): Observable<any> {
    return this.http.get<any>(this._url + 'ListAcademicDegree');
  }

  getListSocialNetworksCatalog(): Observable<any> {
    return this.http.get<any>(this._url + 'ListSocialNetworksCatalog');
  }

  GetSocialNetworksById(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetSocialNetworksById?id=' + id);
  }

  addStudent (professor): Observable<any> {
    return this.http.post(this._url + 'Add', JSON.stringify(professor), httpOptions);
  }

  updateStudent (professor): Observable<any> {
    return this.http.put(this._url + 'Update', JSON.stringify(professor), httpOptions);
  }

  deleteStudent (id): Observable<any> {
    return this.http.delete(this._url + 'Update?id='+ id, httpOptions);
  }

  addSocialNetwork (socialNetwork): Observable<any> {
    return this.http.post(this._url + 'addSocialNetwork', JSON.stringify(socialNetwork), httpOptions);
  }

  addProfessorCourse (professorCourse): Observable<any> {
    return this.http.post(this._url + 'AddCourse', JSON.stringify(professorCourse), httpOptions);
  }

  updateImage (image): Observable<any> {
    return this.http.put(this._url + 'UpdateImage', JSON.stringify(image), httpOptions);
  }
}
