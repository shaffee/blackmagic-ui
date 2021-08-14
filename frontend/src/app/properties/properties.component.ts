import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit , AfterViewChecked } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {EditorService } from '../editor.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit , AfterViewChecked {

  constructor(
    public editorservice: EditorService
  ) {}

  properties : BehaviorSubject<any> = new BehaviorSubject({});
  figureId = '';
  
  ngAfterViewChecked() : void{

  }

  ngOnInit(): void {
    window['properties'].subscribe((ID) => {
        if( ID )
        {
          this.figureId = ID;
          console.log("figure id",this.figureId);
          let figure = window['canvas'].getFigure(this.figureId);
          
          if( figure == null )
            figure = window['canvas'].getLine(this.figureId);

          if( typeof figure.getProperties != 'undefined' )
          {
            console.log("geting properties",figure.getProperties());
            this.properties.next(figure.getProperties());

            console.log("set val",this.properties.getValue());

            this.editorservice.showProperties();
          }
          else
          {
            this.properties.next([]);
            this.editorservice.hideProperties();
          }
        }
        else
        {
          this.figureId = "";
          this.properties.next([]);
          this.editorservice.hideProperties();
        }
    });


    this.properties.subscribe((data) => {
      console.log("sub sub");

      let figure = window['canvas'].getFigure(this.figureId);
      
      if( figure == null )
        figure = window['canvas'].getLine(this.figureId);

      if( figure != null && typeof figure.setProperties != 'undefined' )
      {

        figure.setProperties(data);
      }
      
    });
  }


  updateProperties(){
    console.log("updating");
    console.log(this.properties.getValue());
    this.properties.next(this.properties.getValue());

  }
}
