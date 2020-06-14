import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sv') private scrollView;
  public paused = false;

  constructor() { }

  public items: any[] = [
    { url: './assets/image1.jpg' },
    { url: './assets/img2.jpg' },
    { url: './assets/img3.jpg' }
  ];

  public width: string = "100%";
  public height: string = "600px";
  private interval;

  public ngAfterViewInit() {
    this.interval = setInterval(() => {
      if (!this.paused) {
        this.scrollView.next();
      }
    }, 4000);
  }

  public ngOnDestroy() {
    clearInterval(this.interval);
  }

  ngOnInit(): void {
  }

  onButtonClick() {
    console.log('click');
}

}
