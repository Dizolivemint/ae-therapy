import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  header = {
    'firstName': 'Amelia',
    'lastName': 'Exner',
    'academia': 'M.A.',
    'subTitle': 'Associate Marriage and Family Therapist',
    'phone': 'Phone',
    'phoneNumber': '(619) 732-3168',
    'email': 'Email',
    'map': 'Map'
  }

  
  
  constructor() { }

  ngOnInit() {
  }

}
