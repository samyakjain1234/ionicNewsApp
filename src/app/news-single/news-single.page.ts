import { NewsService } from './../news.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-single',
  templateUrl: './news-single.page.html',
  styleUrls: ['./news-single.page.scss'],
})
export class NewsSinglePage implements OnInit {

  articles:any;

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.articles = this.newsService.currentArticle;
    //console.log(this.newsService.currentArticle);
  }

}
