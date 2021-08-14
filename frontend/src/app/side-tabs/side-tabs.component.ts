import { Component, OnInit , Input } from '@angular/core';
import { BlackuiService } from '../blackui.service'

@Component({
  selector: 'app-side-tabs',
  templateUrl: './side-tabs.component.html',
  styleUrls: ['./side-tabs.component.css']
})
export class SideTabsComponent implements OnInit {

  constructor( private bservice : BlackuiService ) { }

  @Input()
    activeTab: string;

  ngOnInit(): void {
    console.log("dasdasd",this.activeTab);
  }

  getTab():string{

    return this.bservice.activeTab;
  }
}
