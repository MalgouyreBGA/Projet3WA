import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  // use proxy
  domainName:string = "/api" //'https://... //https://localhost:5000

  post(addUrl:string, body:any/*, headers:any*/){
    const fullUrl = this.domainName + addUrl
  console.log("fullUrl", fullUrl)
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    this.http.post<any>(fullUrl, body /*, { headers }*/)
    .subscribe({
        next: (data:any) => {
            console.log("next", data)
        },
        error: (error:any) => {
            //this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })
  }

  constructor( private http:HttpClient,) { }
}
