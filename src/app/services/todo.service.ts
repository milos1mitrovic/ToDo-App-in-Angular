import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IItemModel } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  getTodos(): Observable<IItemModel[]> {
    return this.http.get<IItemModel[]>(`${environment.apiURL}todos`).pipe(
      map((todos) => {
        return todos;
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => new Error('Error while getting todos'));
      })
    );
  }

  addTodoItem(todo: IItemModel): Observable<IItemModel> {
    return this.http.post<IItemModel>(`${environment.apiURL}todos`, todo, {
      headers: this.headers,
    });
  }

  removeTodoItem(id?: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}todos/${id}`, {
      headers: this.headers,
    });
  }

  editTodoItem(todo: IItemModel): Observable<IItemModel> {
    return this.http.patch<IItemModel>(
      `${environment.apiURL}todos/${todo.id}`,
      todo,
      {
        headers: this.headers,
      }
    );
  }

  getTodosByGroupId(groupId: number): Observable<IItemModel[]> {
    return this.http
      .get<IItemModel[]>(`${environment.apiURL}todos?groupId=${groupId}`)
      .pipe(
        map((todos) => {
          return todos;
        }),
        catchError((err: HttpErrorResponse) => {
          return throwError(() => new Error('Error while getting todos'));
        })
      );
  }
}
