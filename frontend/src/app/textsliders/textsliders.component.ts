import { Component, OnInit } from '@angular/core';
import { BlackuiService } from '../blackui.service';
import { HttpClient , HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-textsliders',
  templateUrl: './textsliders.component.html',
  styleUrls: ['./textsliders.component.css']
})
export class TextslidersComponent implements OnInit {

  sliders = [];

  constructor( 
    private bservice : BlackuiService,
    private http: HttpClient
  ){}

  ngOnInit(): void {

    this.bservice.activeTab = 'textsliders';
    this.getSliders();
  }

  getSliders():void{
    this.http.get<HttpResponse<any>[]>("sliders/gettextsliders")
    .subscribe(response => {
      this.sliders = response['data'];
    });
  }

  delete(ID:string ):void{
    this.http.get<HttpResponse<any>[]>("sliders/delete/"+ID)
    .subscribe(response => {
      this.getSliders();
    });
  }

  present(ID:string ):void{
    this.http.get<HttpResponse<any>[]>("sliders/present/"+ID)
    .subscribe(response => {

    });
  }
}
