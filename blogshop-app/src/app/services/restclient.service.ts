import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RestclientService {
  uri = ""
  constructor(private http:HttpClient) {
     this.uri = 'https://blogshopscombinedbackend.appspot.com';

    if (!environment.production) {
        this.uri = 'http://localhost:8080';
  
    }
   }



  getJson(url:string) {
    return this.http.get(this.uri + url)
  }
}
