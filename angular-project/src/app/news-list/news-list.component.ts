import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  news:any = [];

  constructor(public rest:RestService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews() {
    this.news = [];
    this.rest.getNews().subscribe((data: {}) => {
      this.news = data;
    });
  }

}
