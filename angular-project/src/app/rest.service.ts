import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'https://localhost:44352/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getNews(): Observable<any> {
    return this.http.get(endpoint + 'news/GetNews').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getNews'))
      );
  }

  getNewsById(id): Observable<any> {
    return this.http.get(endpoint + 'news/GetNewsById/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getNewsById'))
      );
  }

  addNews (news): Observable<any> {
    return this.http.post<any>(endpoint + 'news/PostNews/', JSON.stringify(news), httpOptions).pipe(
      tap((news) => console.log('added news')),
      catchError(this.handleError<any>('addNews'))
    );
  }

  updateNews (news): Observable<any> {
    return this.http.put(endpoint + 'news/PutNews', JSON.stringify(news), httpOptions).pipe(
      tap((news) => console.log('updated news')),
      catchError(this.handleError<any>('updateNews'))
    );
  }

  deleteNews (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'news/DeleteNews/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted news id=${id}`)),
      catchError(this.handleError<any>('deleteNews'))
    );
  }

  getComments(): Observable<any> {
    return this.http.get(endpoint + 'comment/GetComments').pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getComments'))
      );
  }

  getCommentsByIdNews(id): Observable<any> {
    return this.http.get(endpoint + 'comment/GetCommentsByIdNews/' + id).pipe(
      map(this.extractData),
      catchError(this.handleError<any>('getCommentsByIdNews'))
      );
  }

  addComment (comment): Observable<any> {
    return this.http.post<any>(endpoint + 'comment/PostComment/', JSON.stringify(comment), httpOptions).pipe(
      tap((comment) => console.log('added comment')),
      catchError(this.handleError<any>('addComment'))
    );
  }

  deleteComment (id): Observable<any> {
    return this.http.delete<any>(endpoint + 'comment/DeleteComment/' + id, httpOptions).pipe(
      tap(_ => console.log(`deleted comment id=${id}`)),
      catchError(this.handleError<any>('deleteComment'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
