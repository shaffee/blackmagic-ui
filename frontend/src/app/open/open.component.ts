import { Component, OnInit , ViewEncapsulation } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {Location} from '@angular/common';
import {EditorService} from '../editor.service';

@Component({
  selector: 'app-open',
  templateUrl: './open.component.html',
  styleUrls: ['./open.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class OpenComponent implements OnInit {
  circuits = [];
  constructor( private editorservice : EditorService , private _location: Location , private sanitizer: DomSanitizer , private http: HttpClient ) { }

  ngOnInit(): void {
    this.http.get<HttpResponse<any>[]>("circuits/userCircuits")
    .subscribe(response => {
      this.circuits = response['data'];

          // before
    });

    this.editorservice.disableComponentBar();

  }

  backClicked() {
    this._location.back();
  }

  ngOnDestroy(){
    this.editorservice.enableComponentBar();

    console.log("status",this.editorservice.getComponentBarStatus());
  }

}
