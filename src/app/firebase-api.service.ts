import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Book } from 'src/book';

@Injectable({
  providedIn: 'root'
})
export class FirebaseApiService {

  apiURL = "https://us-central1-bookshelf-ed.cloudfunctions.net";

  constructor(private http: HttpClient) { }

  httpOptions = {
    Headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getBooks(): Observable<Book>{
    return this.http.get<Book>(this.apiURL + '/getBooks')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  addBook(title: string, author: string): Observable<Book>{
    return this.http.post<Book>(this.apiURL + '/addBook?title=' + title + '&author=' + author, null)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  
  delBook(id:string): Observable<Book> {
    return this.http.delete<Book>(this.apiURL + '/deleteBook?id=' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  handleError(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message
    }else{
      errorMessage = 'Error code: ${error.status}\nMessage: ${error.message}';
    }

    window.alert(errorMessage);
    return throwError(errorMessage)
  }
}
