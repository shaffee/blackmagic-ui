import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BlackuiService } from '../blackui.service';
import { Setting } from '../models';

@Component({
  selector: 'app-settings-fonts',
  templateUrl: './settings-fonts.component.html',
  styleUrls: ['./settings-fonts.component.css']
})
export class SettingsFontsComponent implements OnInit {

  public settings : Setting = new Setting;
  
  constructor(
    public bservice: BlackuiService,
    private http : HttpClient,
  ) { }

  ngOnInit(): void {
    this.bservice.activeSettingsTab = 'fonts';
    this.bservice.activeTab = 'settings';

    this.http.get<Setting>("settings/getSettings")
    .subscribe(data => {
      this.bservice.settings = data;
    });

  }

  chooseFont(font:string) : void{

    this.bservice.settings.fontfamily = font;
    
    this.http.post<HttpResponse<any>[]>("settings/saveSettings",this.bservice.settings)
    .subscribe(data => {
      
    });

  }
}
