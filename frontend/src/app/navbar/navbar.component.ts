import { Component, OnInit } from '@angular/core';
import { EditorService } from '../editor.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private editorservice : EditorService ) { }

  ngOnInit(): void {
    console.log(this.editorservice.userDetails());
  }

  isLoggedin():Boolean{
    let loginToken = this.editorservice.getToken();

    if( loginToken != null && loginToken.length > 10 )
    {
        return true;
    }

    return false;
  }

  getUser():string{
    return this.editorservice.userDetails()['username'];
  }
}
