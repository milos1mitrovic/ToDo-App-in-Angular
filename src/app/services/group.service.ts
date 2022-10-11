import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IGroupModel } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) {}

  group = {
    name: 'list3',
  };

  getGroups(): Observable<IGroupModel[]> {
    return this.http.get<IGroupModel[]>(`${environment.apiURL}groups`).pipe(
      map((groups) => {
        return groups;
      })
    );
  }

  addGroup(group: IGroupModel) {
    return this.http.post(`${environment.apiURL}groups`, group, {
      headers: this.headers,
    });
  }

  removeGroupItem(id?: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}groups/${id}`, {
      headers: this.headers,
    });
  }
}
