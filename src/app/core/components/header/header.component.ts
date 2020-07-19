import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  localstorage;
  userId;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.localstorage = JSON.parse(localStorage.getItem('currentUser'));
    console.log('localstorage',this.localstorage)
  }
  logout(){
    this.router.navigate(['/']);
    localStorage.removeItem('currentUser');
    
  }

}
