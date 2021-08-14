import { Component, OnInit } from '@angular/core';
import { BlackuiService } from '../blackui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private bservice : BlackuiService ) { }

  ngOnInit(): void {

    this.bservice.activeTab = 'home';
  }

}
