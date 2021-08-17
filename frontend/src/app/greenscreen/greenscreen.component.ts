import { Component, OnInit } from '@angular/core';
import { io } from "socket.io-client";
import { BlackuiService } from '../blackui.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-greenscreen',
  templateUrl: './greenscreen.component.html',
  styleUrls: ['./greenscreen.component.css']
})
export class GreenscreenComponent implements OnInit {

  animation = "flip";
  elementType = "text";
  content = "";
  zoom = '100%';
  
  constructor(
    private bservice : BlackuiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const socket = io("http://localhost:3000");

    this.zoom = this.activatedRoute.snapshot.params.zoom + '%';

    socket.on("show-slider", (data) => {
      this.animation = this.bservice.settings.entrance_animation;
      this.content = data.content;
      this.elementType = data.type;

      setTimeout(()=>{ 
          this.animation = this.bservice.settings.exit_animation;
      }, 5000);
    });


  }

}
