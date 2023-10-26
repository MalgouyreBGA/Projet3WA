import { Injectable } from '@angular/core';
import { HttpRequestService } from './_http-request.service';
import { Article, BodyUser, rqGetNews } from 'src/app/_typing/http-rq';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestsService {

// data __________________________________________________________________________

  eventArticles:BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([])

// Requests _________________________________________________________________

  async createNewUser(body:BodyUser){
    const addedToUrl:string = '/news/newUser'

    let result = await this.httpRequest.postLogin(addedToUrl, body)
    if (result){

    } else {

    }
  }

  async login(body:BodyUser){
    const addedToUrl:string = '/news/login'
    let result:false|{token:string} = await this.httpRequest.postLogin(addedToUrl, body) as false|{token:string}
    console.log("after", result)
    if (result){
      this.router.navigate(['/home'])
    } else {

    }
  }
  async logout(){
    const addedToUrl:string = '/news/logout'
    let result = await this.httpRequest.post(addedToUrl, {})
    if (result){

    } else {

    }
  }

  async latestNews(){
    const addedToUrl:string = '/news'

    let result = await this.httpRequest.get<rqGetNews>(addedToUrl)
    if (result){
      this.eventArticles.next(result.articles)
    } else {

    }
  }

  constructor(private httpRequest:HttpRequestService,private router:Router) { }
}
