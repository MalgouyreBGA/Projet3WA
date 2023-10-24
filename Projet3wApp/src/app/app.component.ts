import { Component } from '@angular/core';
import { HttpRequestsService } from './_services/http-requests/http-requests.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Projet3wApp';

  test1(){
    this.httpRequests.recherchePointsRelais()
  }

  constructor(private httpRequests:HttpRequestsService) {}
}
