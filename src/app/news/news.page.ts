import { NewsService } from './../news.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  data: any;
  constructor(private newsService: NewsService, private router:Router) { }

  ngOnInit() {
    this.newsService.getData('top-headlines?country=in').subscribe(data=>{
      console.log(data);
      this.data = data;
    })
  }

  onGoToNewsSinglePage(articles){
  this.newsService.currentArticle = articles;
  this.router.navigate(['/news-single']);
  console.log()
  }

}
