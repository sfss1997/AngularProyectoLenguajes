import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('sv') private scrollView;
  public paused = false;

  constructor(private router: Router) { 
  }

  public items: any[] = [
    { url: './assets/image1.jpg' },
    { url: './assets/img2.jpg' },
    { url: './assets/img3.jpg' }
  ];

  private interval;
  public width: string = "100%";
  public height: string = "600px";

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

  public registerStudent() {
    this.router.navigate(['/student-add']);
  }

  public login() {
    this.router.navigate(['/login']);
  }

}
