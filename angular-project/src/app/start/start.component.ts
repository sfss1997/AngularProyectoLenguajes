import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sv') private scrollView;
  public paused = false;
  public value: Date = new Date(2000, 2, 10);
  public listItems: Array<string> = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];

  constructor() { 
  }

  public items: any[] = [
    { url: './assets/image1.jpg' },
    { url: './assets/img2.jpg' },
    { url: './assets/img3.jpg' }
  ];

  public width: string = "100%";
  public height: string = "600px";
  private interval;

  ngOnInit(): void {
  }

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

  public opened = false;
  public dataSaved = false;

    public close() {
      this.opened = false;
    }

    public open() {
      this.opened = true;
    }

    public submit() {
      this.dataSaved = true;
      this.close();
  }

}
