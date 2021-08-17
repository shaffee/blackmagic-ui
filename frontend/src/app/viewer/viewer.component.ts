import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { Router,NavigationEnd  } from '@angular/router';



@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements OnInit{

  public URL = this.sanitizer.bypassSecurityTrustResourceUrl('http://'+ document.location.host + "/screen/50");
  constructor(
    private sanitizer: DomSanitizer,
    private router: Router
  
    ) {
      console.log("shaffee",router.url);
      


    }

  ngOnInit(){

  }

}
