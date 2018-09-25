import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-mileslider',
  templateUrl: './mileslider.component.html',
  styleUrls: ['./mileslider.component.sass']
})
export class MilesliderComponent implements OnInit {
  images: string[];
  bgWidth: string;
  bgFader: string;
  bgLeft: string;
  url: string;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.urlAfterRedirects;
        console.log(`URL: ${this.url}`);
        if (this.url != '/') {
          this.bgFader = 'none';
        } else {
          this.bgFader = 'fader 15s infinite';
        }
        if (this.url === '/present/vision') {
          console.log(`URL ===: ${this.url}`);
          this.bgLeft = '-100%';
        }
      }
    });
  }

  ngOnInit() {
    this.images = [
      './assets/images/aloe-510113_1920.jpg',
      './assets/images/cactus-1088154_1920.jpg',
      './assets/images/fat-hen-737409_1920.jpg'
    ];
  }
}
