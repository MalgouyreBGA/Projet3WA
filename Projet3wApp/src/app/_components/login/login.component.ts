import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpRequestsService } from 'src/app/_services/http-requests/http-requests.service';
import { BodyUser } from 'src/app/_typing/http-rq';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // data _____________________________________________
  defaultLogin:{username?:string, password?:string} = {
    username:"",
    password:""
  }
  form:{ username?:string, password?:string } = { ...this.defaultLogin}

  // display switch _____________________________
  @Output() uponClick = new EventEmitter<true>()
  click(){this.uponClick.emit(true)}


  // webrequest __________________________________
  login(){
    if(this.form.username && this.form.password){
      const body:BodyUser = {
        username:this.form.username,
        password:this.form.password
      }
      this.httpRq.login(body)
    }
  }
  
  // constructor & lifecycle
  
  constructor(private httpRq:HttpRequestsService){}

  ngOnInit(): void {
    this.form = { ...this.defaultLogin}
  }

}
