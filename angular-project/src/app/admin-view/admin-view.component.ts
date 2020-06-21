import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  public gridComments: any;
  public gridNews: any;

  news:any = [];
  comments:any = [];
  new:any;
  newsName:any;

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getNews();
    this.getComments();
  }

  getNews() {
    this.news = [];
    this.rest.getNews().subscribe((data: {}) => {
      this.news = data;
      this.gridNews = data;
    });
  }

  getComments() {
    this.comments = [];
    this.rest.getComments().subscribe((data: {}) => {
      this.comments = data;
      this.gridComments = data;
      this.comments.forEach(c => {
        this.getNewsById(c.newsId);
      });
    });
  }

  getNewsById(newsId) {
    this.rest.getNewsById(newsId).subscribe((data: {}) => {
      this.new = data;
      this.newsName = this.new.title;
    });
  }


}
