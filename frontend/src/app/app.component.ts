import { Component } from '@angular/core';
import {EditorService} from './editor.service'
import { Router } from '@angular/router';
import { HttpClient , HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

window['properties'] = new BehaviorSubject('');

// Now you can use this anywhere. (You can even drop the 'window' as it is global)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'opencircuits';
}
