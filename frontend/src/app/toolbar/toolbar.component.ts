import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(public editorservice: EditorService) { }

  editTitle = false;
  
  ngOnInit(): void {
  }

  editTitleClicked():void{
    this.editTitle = true;

  }
  clearCircuit():void{
    window['circuits'].clear();
  }

  stop():void{
    this.editorservice.setSimulating(false);
    window['circuits'].stop();
    this.editorservice.hideInspector();
  }
  
  simulate():void{
    
    if( !this.editorservice.display.getValue()['inspector'] )
      this.toggleInspector();
      
    setTimeout(()=>{
      this.editorservice.setSimulating(true);
      window['circuits'].simulate();
    }, 10);

    this.editorservice.showInspector();
    this.editorservice.hideProperties();
  }

  isSumilating()
  {
    return this.editorservice.getSimulating();
  }
  getComp(){
    let comp = this.editorservice.getComponent();

    return comp;


    return '';
  }

  @HostListener('document:keydown.meta.s', ['$event'])
  save(){
    this.editorservice.saveCircuit();

    return false;
  }

  @HostListener('document:keydown.enter', ['$event'])
  saveTitle():void{
    this.editorservice.saveCircuit();
    this.editTitle = false;
  }

  undo():void{
    window['canvas'].getCommandStack().undo();
  }

  redo():void{
    window['canvas'].getCommandStack().redo();
  }

  @HostListener('document:keydown.meta.z', ['$event'])
  zoomin():void{
    window['canvas'].setZoom(window['canvas'].getZoom()*0.7,true);
  }

  zoomout():void{
    window['canvas'].setZoom(window['canvas'].getZoom()*1.3,true);
  }

  zoomfit():void{
    window['canvas'].setZoom(1.0,true);
  }

  @HostListener('document:keydown.backspace', ['$event'])
  deleteSelected():void{
    window['circuits'].deleteSelected();
  }

  toggleProperties():boolean{
    this.editorservice.toggleProperties();
    return false;
  }

  toggleInspector():boolean{
    this.editorservice.toggleInspector();
    return false;
  }

  toggleComponents():boolean{
    this.editorservice.toggleComponents();
    return false;
  }
}
