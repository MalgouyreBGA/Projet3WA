import { Component } from '@angular/core';

@Component({
  selector: 'app-login-co',
  templateUrl: './login-co.component.html',
  styleUrls: ['./login-co.component.css']
})
export class LoginCoComponent {

  isRegistering:boolean = false
  switch(){this.isRegistering = !this.isRegistering}
}
