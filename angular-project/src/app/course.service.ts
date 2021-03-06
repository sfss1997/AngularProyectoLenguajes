import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _url = 'http://localhost:8080/Course/';

  paramsPublicConsultation = new HttpParams();
  paramsPrivateConsultation = new HttpParams();
  paramsAppointment = new HttpParams();
  paramsAppointmentProfessor = new HttpParams();

  constructor(private http: HttpClient) { }

  add (course): Observable<any> {
    return this.http.post(this._url + 'Add', JSON.stringify(course), httpOptions);
  }

  update (course): Observable<any> {
    return this.http.put(this._url + 'Update', JSON.stringify(course), httpOptions);
  }

  delete (id): Observable<any> {
    return this.http.delete(this._url + 'DeleteCourse?id='+ id, httpOptions);
  }

  addPublicConsultation (publicConsultation): Observable<any> {
    return this.http.post(this._url + 'AddPublicConsultation', JSON.stringify(publicConsultation), httpOptions);
  }

  addRepliesPublicConsultation (repliesPublicConsultation): Observable<any> {
    return this.http.post(this._url + 'AddRepliesPublicConsultation', JSON.stringify(repliesPublicConsultation), httpOptions);
  }

  addPrivateMessage (privateMessage): Observable<any> {
    return this.http.post(this._url + 'AddPrivateMessage', JSON.stringify(privateMessage), httpOptions);
  }

  addRepliesPrivateMessage (repliesPrivateMessage): Observable<any> {
    return this.http.post(this._url + 'AddRepliesPrivateMessage', JSON.stringify(repliesPrivateMessage), httpOptions);
  }

  addAppointment (appointment): Observable<any> {
    return this.http.post(this._url + 'AddAppointment', JSON.stringify(appointment), httpOptions);
  }

  updateStatusAppointment (statusAppointment): Observable<any> {
    return this.http.put(this._url + 'UpdateStatusAppointment', JSON.stringify(statusAppointment), httpOptions);
  }

  getCourseById(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetCourseById?id=' + id);
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(this._url + 'ListAllCourses');
  }

  getStudentCourses(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetStudentCourses?id=' + id);
  }

  getProfessorCourses(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetProfessorCourses?id=' + id);
  }

  getProfessorByIdCourse(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetProfessorByIdCourse?id=' + id);
  }

  getPublicConsultation(publicConsultation): Observable<any> {
    this.paramsPublicConsultation = this.paramsPublicConsultation.append('courseId', publicConsultation.courseId);
    this.paramsPublicConsultation = this.paramsPublicConsultation.append('professorId', publicConsultation.professorId);

    return this.http.get<any>(this._url + 'GetPublicConsultation', { params: this.paramsPublicConsultation });
  }

  getPrivateMessage(privateMessage): Observable<any> {
    this.paramsPrivateConsultation = this.paramsPrivateConsultation.append('courseId', privateMessage.courseId);
    this.paramsPrivateConsultation = this.paramsPrivateConsultation.append('professorId', privateMessage.professorId);

    return this.http.get<any>(this._url + 'GetPrivateMessage', { params: this.paramsPrivateConsultation });
  }

  getRepliesPublicConsultation(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetRepliesPublicConsultation?id=' + id);
  }

  getRepliesPrivateMessage(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetRepliesPrivateMessage?id=' + id);
  }

  getAppointment(appointment): Observable<any> {
    this.paramsAppointment = this.paramsAppointment.append('studentId', appointment.studentId);
    this.paramsAppointment = this.paramsAppointment.append('professorId', appointment.professorId);
    this.paramsAppointment = this.paramsAppointment.append('courseId', appointment.courseId);

    return this.http.get<any>(this._url + 'GetAppointment', { params: this.paramsAppointment });
  }

  getAppointmentById(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetAppointmentById?id=' + id);
  }

  getAppointmentProfessor(appointment): Observable<any> {
    this.paramsAppointmentProfessor = this.paramsAppointmentProfessor.append('courseId', appointment.courseId);
    this.paramsAppointmentProfessor = this.paramsAppointmentProfessor.append('professorId', appointment.professorId);
    return this.http.get<any>(this._url + 'GetAppointmentProfessor', { params: this.paramsAppointmentProfessor });
  }

}
