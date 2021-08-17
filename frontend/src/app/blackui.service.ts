import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Setting } from './models';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlackuiService  {

  activeTab = '';
  activeSettingsTab = '';
  public settings : Setting = new Setting;

  constructor(
    private http : HttpClient,
  ) {
    
    this.updateSettings();
  }
  

  public updateSettings(){
    this.http.get<Setting>("settings/getSettings")
    .subscribe(data => {
      this.settings = data;
    });
  }

  public getSliderStyle():string{
    var style = [];

    style.push('background-image:url('+environment.APIURL+'settings/background/'+this.settings.background+")");
    style.push('text-align:'+this.settings.textalign);
    style.push('font-size:'+this.settings.textsize+'px');
    style.push('padding:'+this.settings.padding+'px');
    style.push('margin:'+(this.settings.margin/5)+'%');
    style.push('color:'+this.settings.textcolor);

    return style.join(";");
  }
}
