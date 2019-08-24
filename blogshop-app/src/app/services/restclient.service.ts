import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestclientService {

  constructor(private http:HttpClient) { }

  // uri = 'http://localhost:8080';
  uri = 'https://blogshopscombinedbackend.appspot.com';
  
  getJson(url:string) {
    return this.http.get(this.uri + url)
  }
}
