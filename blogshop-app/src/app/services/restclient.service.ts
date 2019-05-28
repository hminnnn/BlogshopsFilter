import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestclientService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:4000';

  getJson(url:string) {
    return this.http.get(this.uri + url)
  }
}
