import { Component, OnInit } from '@angular/core';
import { BlackuiService } from '../blackui.service';
@Component({
  selector: 'app-settings-tabs',
  templateUrl: './settings-tabs.component.html',
  styleUrls: ['./settings-tabs.component.css']
})
export class SettingsTabsComponent implements OnInit {

  constructor(
    private bservice : BlackuiService,
  ) { }

  ngOnInit(): void {
  }

  getTab() : string{
    return this.bservice.activeSettingsTab;
  }

}
