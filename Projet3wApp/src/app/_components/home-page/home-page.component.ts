import { Component, OnInit } from '@angular/core';
import { HttpRequestsService } from 'src/app/_services/http-requests/http-requests.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private httpRequests:HttpRequestsService) {}
  ngOnInit(): void {this.httpRequests.latestNews()}
}
