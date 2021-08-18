import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { BlackuiService } from '../blackui.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-greenscreen',
  templateUrl: './greenscreen.component.html',
  styleUrls: ['./greenscreen.component.css']
})
export class GreenscreenComponent implements OnInit {

  animation = "";
  elementType = "";
  content = "";
  zoom = '100%';
  
  sliderIndex = 0;
  sliderImages = [];
  sliderText = [];
  sliderTimerSeconds = 5;

  constructor(
    private bservice : BlackuiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const socket = io(environment.APIURL);

    this.zoom = this.activatedRoute.snapshot.params.zoom + '%';

    setInterval(()=>{ 
      this.bservice.updateSettings();
      this.playSlider();
    }, 1000);

    
    socket.on("show-slider", (data) => {
      this.animation = this.bservice.settings.entrance_animation;
      this.content = data.content;
      this.elementType = data.type;

      setTimeout(()=>{ 
          this.animation = this.bservice.settings.exit_animation;
      }, 5000);
    });

    socket.on("show-tathweeb", (eventData) => {

      for( var i=0; i<eventData.images.length; i++ )
      {
        eventData.images[i]['src'] = environment.APIURL + 'tathweeb/getImage/' + eventData.images[i].filename;
      }

      this.animation = this.bservice.settings.entrance_animation;
      this.sliderImages = eventData.images;
      this.sliderText = eventData.text;
      this.elementType = 'tathweeb';
    });

  }


  playSlider():void{
    var d = new Date();
    var n = d.getSeconds();

    if( n % this.sliderTimerSeconds == 0 )
    {
      if( this.elementType == 'tathweeb' )
      {
        this.sliderIndex = ++this.sliderIndex % this.sliderImages.length;
      }
    }
  }

}
