import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private _url = 'http://localhost:8080/Location/';

  constructor(private http: HttpClient) { }

  getProvinces(): Observable<any> {
    return this.http.get<any>(this._url + 'ListAllProvinces');
  }

  getCantonsByIdProvince(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetCantonsByIdProvince?id=' + id);
  }

  getDistrictsByIdCanton(id): Observable<any> {
    return this.http.get<any>(this._url + 'GetDistrictsByIdCanton?id=' + id);
  }
}
