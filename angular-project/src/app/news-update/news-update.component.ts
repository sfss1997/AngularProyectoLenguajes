import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-news-update',
  templateUrl: './news-update.component.html',
  styleUrls: ['./news-update.component.css']
})
export class NewsUpdateComponent implements OnInit {

  @Input() newsData:any = { authorName: '', title: '', text:''};
  public value: Date;

  constructor(public snackBar: MatSnackBar, private restService: RestService,
    private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
    this.restService.getNewsById(this.route.snapshot.params['id']).subscribe((data: {}) => {
      this.newsData = data;
      console.log(this.newsData);
      this.value = new Date(this.newsData.dateTime);
    });
  }

  updateNews() {
      var yy = this.value.getFullYear();
      var mm = this.value.getUTCMonth()+1;
      var dd = this.value.getUTCDate();
      var date = yy+'-'+mm+'-'+dd;
  
      var news = {
        'id': this.route.snapshot.params['id'],
        'title': this.newsData.title,
        'text': this.newsData.text,
        'dateTime': date,
        'authorName': this.newsData.authorName,
        'authorId': 1
      }
  
      this.restService.updateNews(news).subscribe((data: {}) => {
        this.openSnackBar('Noticia actualizada', '');
        this._location.back();
      });
    }
  
    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }
}
