import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {

  token?:string

  // use proxy
  domainName:string = "/api"

// login/out 
postLogin(addUrl:string, body:any/*, headers:any*/){
  const fullUrl = this.domainName + addUrl
  console.log("fullUrl", fullUrl)
  return new Promise((resolve, reject) => {
    //const headers = { 'Authorization': 'Bearer my-token', 'My-Custom-Header': 'foobar' };
    this.http.post<any>(fullUrl, body /*, { headers }*/)
    .subscribe({
      next: (data:any) => {
        console.log("next", data)
        const { token, ...rest } = data;
        if(token){this.token = token}
        console.log(this.token)
        resolve(token ? true : false)
      },
      error: (error:any) => {
        //this.errorMessage = error.message;
        console.error('There was an error!', error);
        reject(error)
      }
    })
  })
}

// other
  async get<R>(addUrl:string):Promise<R|false>{
    const fullUrl = this.domainName + addUrl
    return new Promise((resolve, reject) => {
      this.http.get<R>(fullUrl) /*, { headers }*/
      .subscribe({
        next: (data:any) => {
          console.log("next", data)
          resolve(data)
        },
        error: (error:any) => {
          //this.errorMessage = error.message;
          console.error('There was an error!', error);
          reject(false)
        }
      })
    })
  }

  post(addUrl:string, body:any ){
    if(this.token){
      const fullUrl = this.domainName + addUrl
      console.log("fullUrl", fullUrl)
      return new Promise((resolve, reject) => {
        const headers = { 'Authorization': this.token as string};
        this.http.post<any>(fullUrl, body, { headers })
        .subscribe({
          next: (data:any) => {
            console.log("next", data)
            resolve(data)
          },
          error: (error:any) => {
            //this.errorMessage = error.message;
            console.error('There was an error!', error);
            reject(error)
          }
        })
      })
    }
    return false
  }

  constructor( private http:HttpClient,) { }
}
