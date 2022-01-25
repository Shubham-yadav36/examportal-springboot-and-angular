import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class ProfileUploadService {

  constructor(private http:HttpClient) { }

  profileUpload(file : File ){
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post(`${baseUrl}/user/uploaProfile/`, formData);
  }
}
