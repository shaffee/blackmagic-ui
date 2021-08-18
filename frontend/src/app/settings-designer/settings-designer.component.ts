import { HttpClient, HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BlackuiService } from '../blackui.service';
import {Setting} from '../models'
import { environment } from '../../environments/environment';
import { io } from "socket.io-client";


@Component({
  selector: 'app-settings-designer',
  templateUrl: './settings-designer.component.html',
  styleUrls: ['./settings-designer.component.css']
})

export class SettingsDesignerComponent  {

  private image:File;
  private choosen = false;
  private submitted = false;
  private socket;

  constructor(
    public bservice : BlackuiService,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.socket = io(environment.APIURL);

    this.bservice.activeSettingsTab = 'designer';
    this.bservice.activeTab = 'settings';

    this.http.get<Setting>("settings/getSettings")
    .subscribe(data => {
      this.bservice.settings = data;
    });


    //this.save();
  }

  getBackgroundImage():string{
   return environment.APIURL + 'settings/background/'+this.bservice.settings.background;
  }
  
  save():void{
    this.http.post<HttpResponse<any>[]>("settings/saveSettings",this.bservice.settings)
    .subscribe(data => {
      
    });
  }

  fileChoosen(event:any)
  {
    if( event.target.value )
    {
      this.image = <File>event.target.files[0];
      this.choosen = true;
      this.submitted = true;

      this.pushFileToStorage(this.image);
    }
  }

  pushFileToStorage(file: File){
      const formdata: FormData = new FormData();
  
      formdata.append('file', file);

      this.http.post("settings/upload", formdata)
      .subscribe(data => {
          this.bservice.settings.background = data['file'];
      });
  }
  

}
