import { Component, EventEmitter, Output } from '@angular/core';
import { HttpRequestsService } from 'src/app/_services/http-requests/http-requests.service';
import { BodyUser } from 'src/app/_typing/http-rq';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // data
    defaultLogin:{username?:string, password?:string, password2?:string} = {
    username:"",
    password:"",
    password2:""
  }
  form:{ username?:string, password?:string, password2?:string} = { ...this.defaultLogin}


  // display switch
  @Output() uponClick = new EventEmitter<true>()
  click(){this.uponClick.emit(true)}

  // 2 passwords comparaison
  isSame?:boolean
  onValueChange(){
    this.isSame = this.form.password === this.form.password2
  }

  // webrequest
  inscription(){
    if(this.form.username && this.form.password && this.isSame){
      const body:BodyUser = {
        username:this.form.username,
        password:this.form.password
      }
      this.httpRq.createNewUser(body)
    }
  }

// constructor & lifecycle

  constructor(private httpRq:HttpRequestsService){}

  ngOnInit(): void {
    this.form = { ...this.defaultLogin}
  }
}
