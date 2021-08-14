import { Component, NgModule, OnInit } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';
import {EditorService} from '../editor.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})

export class ComponentsComponent implements OnInit {

  components = [];
  shiftKey = false;

  master = 'Hello';
  selectedComponent = [];
  
  constructor(private http: HttpClient ,  private editorservice : EditorService) { }

  ngOnInit(): void {
    
    this.http.get<HttpResponse<any>[]>("circuits/getComponents")
    .subscribe(data => {
      this.components = data;
    })
  
  }

  selectComponent( comp )
  {
    let selectedComponent = this.getComponent(comp)[0];

    if( selectedComponent == this.selectedComponent )
    {
      window['selectedComponent'] = [];
      this.selectedComponent = [];  
    }
    else
    {
      window['selectedComponent'] = selectedComponent;
      this.selectedComponent = selectedComponent;  
    }

    this.editorservice.setComponent(this.selectedComponent);

  }

  getSelectedComponentId():string{

    if( this.selectedComponent )
      return this.selectedComponent['id'] || '';

    return '';
  }

  filterItemsOfType(type){
    //console.log(type);
      return this.components.filter(x => x.type == type);
  }

  getComponent(id){
    //console.log(type);
      return this.components.filter(x => x.id == id);
  }

  @HostListener('document:keydown.shift', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    window['shiftKey'] = true;
    this.shiftKey = true;
  }

  @HostListener('document:keyup.shift', ['$event'])
  handleShiftUp(event: KeyboardEvent) { 

    if( this.selectedComponent )
    {
      window['shiftKey'] = false;
      this.shiftKey = false;
      this.selectComponent( this.selectedComponent['id'] );  
    }
  }

  @HostListener('document:keydown.esc', ['$event'])
  handleKeyboardEvent2(event: KeyboardEvent) { 
    if( this.selectedComponent )
    {
      this.selectComponent( this.selectedComponent['id'] );
    }
  }
}
