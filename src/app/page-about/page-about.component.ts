import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';


@Component({
  selector: 'app-page-about',
  templateUrl: './page-about.component.html',
  styleUrls: ['./page-about.component.sass']
})
export class PageAboutComponent implements OnInit {

  constructor(meta: Meta, title: Title) {
    title.setTitle('Amelia Exner | Marriage and Family Therapy | About');
    
    meta.addTags([
      { name: 'author', content: 'Amelia Exner' },
      { name: 'keywords', content: 'San Diego, MFT, Marriage, Family, Counselor, Therapy, Therapist' },
      { name: 'description', content: 'About Amelia Exner, Marriage and Family Therapist, practicing therapy in the San Diego, Califonia region.'}
    ]);
  }
   

  ngOnInit() {
  }

}
