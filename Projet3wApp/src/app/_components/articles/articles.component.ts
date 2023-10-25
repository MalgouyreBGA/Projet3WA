import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { HttpRequestsService } from 'src/app/_services/http-requests/http-requests.service';
import { Article } from 'src/app/_typing/http-rq';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  articles:Article[] = []

  download:Subscription[] = []

  constructor(private rq:HttpRequestsService){}

  ngOnInit(): void {
    this.download=[
      this.rq.eventArticles.subscribe((data:Article[])=>{
        this.articles = data
      })
    ];
  }
  ngOnDestroy(): void {
    this.download.forEach(sub=>{sub.unsubscribe()})
  }
}
