import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../rest.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.css']
})
export class NewsAddComponent implements OnInit {

  @Input() newsData = { authorName: '', title: '', text:''};
  value: Date = new Date(2020, 6, 7);

  constructor(public snackBar: MatSnackBar, private restService: RestService,
    private route: ActivatedRoute, private _location: Location) { }

  ngOnInit(): void {
  }

  addNews() {
    var yy = this.value.getFullYear();
    var mm = this.value.getUTCMonth()+1;
    var dd = this.value.getUTCDate();
    var date = yy+'-'+mm+'-'+dd;

    var news = {
      'id': 0,
      'title': this.newsData.title,
      'text': this.newsData.text,
      'dateTime': date,
      'authorName': this.newsData.authorName,
      'authorId': this.route.snapshot.params['id']
    }

    this.restService.addNews(news).subscribe((data: {}) => {
      this.openSnackBar('Noticia añadida', '');
      this._location.back();
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  cancel() {
    this._location.back();
  }

}
