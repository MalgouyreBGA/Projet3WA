import { Injectable } from '@angular/core';
import { HttpRequestService } from './_http-request.service';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

  recherchePointsRelais(){
    const addedToUrl:string = '/json_pointrelais'
    const body:{
      Enseigne:string,
      Pays:string,
      CP:string,
    } = {
      Enseigne:"BDTEST13",
      Pays:"FR",
      CP:"13000",
    }
    console.log('body',body)
    this.httpRequest.post(addedToUrl, body)
  }

  constructor(private httpRequest:HttpRequestService) { }
}
