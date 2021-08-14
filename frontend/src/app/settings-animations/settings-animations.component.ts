import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlackuiService } from '../blackui.service';
import { Setting } from '../models';

@Component({
  selector: 'app-settings-animations',
  templateUrl: './settings-animations.component.html',
  styleUrls: ['./settings-animations.component.css']
})
export class SettingsAnimationsComponent implements OnInit {

  public settings : Setting = new Setting;
  
  constructor(
    private bservice : BlackuiService,
    private http : HttpClient,
  ) { }

  ngOnInit(): void {
    this.bservice.activeSettingsTab = 'animations';
    this.bservice.activeTab = 'settings';

    this.http.get<Setting>("settings/getSettings")
    .subscribe(data => {
      this.settings = data;
    });

  }

  chooseFont(font:string) : void{

    this.settings['fontfamily'] = font;
    
    this.save();
  }

  save() : void{
    this.http.post<HttpResponse<any>[]>("settings/saveSettings",this.settings)
    .subscribe(data => {
      
    });
  }

}
