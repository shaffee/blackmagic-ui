import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { EditorService } from '../editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  id = '';

  constructor( 
    private route: ActivatedRoute ,
    private router : Router,
    public editorservice : EditorService,

    ) { }

  ngOnInit(): void {
    console.log("shaffee",this.router);
    this.id = this.route.snapshot.paramMap.get('id');
    this.editorservice.setId(this.id);

    if( this.id.length > 5 )
    {
      this.editorservice.getCircuit();
    }
    else
    {
      let id = localStorage.getItem('circuitID') || '';

      if( id.length > 5 )
      {
          this.editorservice.setId(id);
          this.router.navigate(["editor/"+this.editorservice.getId()], {replaceUrl:true});
      }
    }
    
    this.editorservice.enableComponentBar();


  }
  
  canDeactivate(): boolean{
    return false;
  }
}
