import { Component, OnInit } from '@angular/core';
import { BlackuiService } from '../blackui.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(
    private bservice : BlackuiService,
  ) { }

  ngOnInit(): void {
    this.bservice.activeTab = 'settings';

  }

}
