import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlackuiService } from '../blackui.service';

@Component({
  selector: 'app-tathweeb',
  templateUrl: './tathweeb.component.html',
  styleUrls: ['./tathweeb.component.css']
})
export class TathweebComponent implements OnInit {

  private images:File[];
  private choosen = false;
  private submitted = false;
  public uploadedImages;
  public sliderText = '';
  sliders = [];

  constructor(
    private http: HttpClient,
    private bservice: BlackuiService,
    
  ) { }

  ngOnInit(): void {
    this.bservice.activeTab = 'tathweeb';
    this.bservice.activeTab = 'tathweeb';


    this.getImages();
    this.getSliders();
  }

  fileChoosen(event:any)
  {
    if( event.target.value )
    {
      this.images = event.target.files;
      this.choosen = true;
      this.submitted = true;

      this.pushFileToStorage(this.images);
    }
  }

  pushFileToStorage(file: File[]){
      const formdata: FormData = new FormData();
    
      for(var i=0; i<file.length; i++)
      formdata.append('file[]', file[i]);

      this.http.post("tathweeb/upload", formdata)
      .subscribe(data => {
          //this.bservice.settings.background = data['file'];

          this.getImages();
      });
  }

  getImages(){
    this.http.get<any>("tathweeb/getImages")
    .subscribe(data => {

      for( var i=0; i<data.data.length; i++ )
      {
        data.data[i]['src'] = environment.APIURL + 'tathweeb/getImage/' + data.data[i].filename;
      }

      this.uploadedImages = data.data;

    });
  }

  getSliders():void{
    this.http.get<HttpResponse<any>[]>("tathweeb/gettextsliders")
    .subscribe(response => {
      this.sliders = response['data'];
    });
  }

  deleteImage(ID:string ):void{
    this.http.get<HttpResponse<any>[]>("tathweeb/deleteImage/"+ID)
    .subscribe(response => {
      this.getImages();
    });
  }


  delete(ID:string ):void{
    this.http.get<HttpResponse<any>[]>("tathweeb/delete/"+ID)
    .subscribe(response => {
      this.getSliders();
    });
  }

  addText():string{
    
      if( !this.sliderText )
      {
        return '';
      }

      this.http.post<HttpResponse<any>[]>("tathweeb/addText",{text:this.sliderText})
      .subscribe(data => {

        this.getSliders();
        this.sliderText = '';

      })  
  }
  
  present():void{
    this.http.get<HttpResponse<any>[]>("tathweeb/present")
    .subscribe(response => {
      
    });
  }

}
