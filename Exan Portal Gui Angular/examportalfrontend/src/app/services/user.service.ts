import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  public getUser(username) {
    return this.http.get(`${baseUrl}/user/${username}`);
  }

  public updateUser(user: any) {
    return this.http.put(`${baseUrl}/user/`, user);
  }

  public allUser() {
    return this.http.get(`${baseUrl}/user/all`);
  }

  public deleteUser(id) {
    return this.http.delete(`${baseUrl}/user/${id}`);
  }

  public upload(file, userId) {
    // Create form data
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append('file', file, file.name);
    return this.http.post(`${baseUrl}/user/upload/${userId}`,formData);
  }
}
