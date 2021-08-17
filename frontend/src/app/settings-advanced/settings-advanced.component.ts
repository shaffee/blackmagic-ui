import { Component, OnInit } from '@angular/core';
import { BlackuiService } from '../blackui.service';
import { io } from "socket.io-client";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-settings-advanced',
  templateUrl: './settings-advanced.component.html',
  styleUrls: ['./settings-advanced.component.css']
})
export class SettingsAdvancedComponent implements OnInit {

  public response = '';
  private socket;
  public output;

  constructor( public bservice : BlackuiService ) { }

  ngOnInit(): void {
    this.socket = io(environment.APIURL);

    this.bservice.activeSettingsTab = 'advanced';
    this.bservice.activeTab = 'settings';

    this.output = "dsdfsd";
    this.socket.on("update-process", (data) => {
      this.output += data['msg'];
    });

  }


  rebuild():void{
    console.log("emit");

    this.socket.emit("rebuild", {msg:'builddd'});
  }

}
