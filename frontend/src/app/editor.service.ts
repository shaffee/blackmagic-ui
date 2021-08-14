import { Injectable , OnChanges } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient , HttpResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditorService implements OnChanges  {
  selectedComponent = '';
  simulating = false;
  id = '';
  enableComponent = true;
  circuitTitle = '';

  display : BehaviorSubject<any> = new BehaviorSubject({
    properties:true,
    toolbar:true,
    components:true,
    inspector:false,
  });
  
  
  constructor( private router: Router , private http: HttpClient ) {

    //refresh properties view to subscribe to properties value only.
    let displayValue = this.display.getValue();
    displayValue['properties'] = true;
    this.display.next( displayValue );

    /*
    let savedDisplay = localStorage.getItem('display');

    
    if( savedDisplay != null && savedDisplay.length > 10 )
      this.display.next(JSON.parse(savedDisplay));

    this.display.subscribe((data) => {
        localStorage.setItem('display',JSON.stringify(data));
    });
    */
    
  };

  setId(id){
    
    this.id = id;
    if( this.id.length > 5 )
    {
      localStorage.setItem('circuitID',this.id);
    }
  }

  getId(){
    return this.id;
  }

  setComponent( comp )
  {
    this.selectedComponent = comp;
  }

  getComponent()
  {
    return this.selectedComponent;
  }

  setSimulating( sim )
  {
    this.simulating = sim;
  }

  getSimulating()
  {
    return this.simulating;
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  userDetails():{}{

    const helper = new JwtHelperService();
 
    let token = this.getToken();
    var decoded = helper.decodeToken(token);

    if( decoded )
    return decoded;

    return {username:''};
  }

  username():string{

    const helper = new JwtHelperService();
 
    let token = this.getToken();
    var decoded = helper.decodeToken(token);

    if( decoded )
    return decoded['username'];

    return '';
  }

  logout():void{
    
    localStorage.removeItem('token');

    this.router.navigate(['/']);

  }

  isLoggedin():Boolean{
    let loginToken = this.getToken();

    if( loginToken != null && loginToken.length > 10 )
    {
        return true;
    }

    return false;
  }

  saveCircuit(){
    console.log("idddd",this.getId());

      let json = window['circuits'].getJson();
      let svg = '';//window['circuits'].getSVG();
      let png = window['circuits'].getPNG();

      let data = {json:json , svg:svg , png:png , title:this.circuitTitle};

      if( this.getId() )
      {
        data['id'] = this.getId();
      }
      
      this.http.post<HttpResponse<any>[]>("circuits/save",data)
      .subscribe(data => {
          if( data['code'] == '100' )
          {
            this.setId(data['data']['id']);
            this.router.navigate(['/editor/' + data['data']['id']]);
          }
          else if( data['code'] == '200' )
          {
            console.log("setting token" , data['data']);
            localStorage.setItem('token',data['data']);


            //this.errors.push(this.$t('message.' + response.data.msg));
          }
      });

      return false;
  }

  getCircuit(){

      let data = {id:this.getId()};
 
      this.http.post<HttpResponse<any>[]>("circuits/get",data)
      .subscribe(resp => {

        window['circuits'].clear();
          localStorage.setItem('circuit',resp['data']['json']);
          window['circuits'].loadSession();

          this.circuitTitle = resp['data']['title'] || '';



          /*
          if( resp['code'] == '100' )
          {
            this.setId(data['data']['id']);
            this.router.navigate(['/editor/' + data['data']['id']]);
          }
          else if( data['code'] == '200' )
          {
            console.log("setting token" , data['data']);
            localStorage.setItem('token',data['data']);


            //this.errors.push(this.$t('message.' + response.data.msg));
          }
          */
      });

      return false;
  }

  getComponentBarStatus(){
    return this.enableComponent;
  }

  disableComponentBar(){
    this.enableComponent = false;
  }

  enableComponentBar(){
    this.enableComponent = true;
  }

  getTitle():string{
    if( this.circuitTitle == '' )
      this.circuitTitle = "Untitled";

    return this.circuitTitle;
  }

  setTitle(title){
    this.circuitTitle = title;
  }

  ngOnChanges(changes) {
      console.log(changes);
  }

  showProperties():boolean{
    let data = this.display.getValue();
    
    data['properties'] = true;
    this.display.next(data);

    return false;
  }

  showInspector():boolean{
    let data = this.display.getValue();
    
    data['inspector'] = true;
    this.display.next(data);

    return false;
  }

  hideProperties():boolean{
    let data = this.display.getValue();
    
    data['properties'] = false;
    this.display.next(data);

    return false;
  }

  hideInspector():boolean{
    let data = this.display.getValue();
    
    data['inspector'] = false;
    this.display.next(data);

    return false;
  }

  toggleProperties():boolean{
    let data = this.display.getValue();
    
    data['properties'] = data['properties'] ? false : true;
    this.display.next(data);

    return false;
  }

  toggleInspector():boolean{
    let data = this.display.getValue();
    
    data['inspector'] = data['inspector'] ? false : true;
    this.display.next(data);

    return false;
  }

  toggleComponents():boolean{
    let data = this.display.getValue();
    
    data['components'] = data['components'] ? false : true;
    this.display.next(data);

    return false;
  }

}
