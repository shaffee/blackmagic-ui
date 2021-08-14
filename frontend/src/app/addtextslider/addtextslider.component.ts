import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtextslider',
  templateUrl: './addtextslider.component.html',
  styleUrls: ['./addtextslider.component.css']
})
export class AddtextsliderComponent implements OnInit {

  form = { text:'', seconds:'5', textsize:'20' };
  errors = [];
  
  constructor(
    private http: HttpClient , 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addslider():void{
    
    if( this.checkForm() )
    {
      this.http.post<HttpResponse<any>[]>("sliders/addtextslider",this.form)
      .subscribe(data => {

        if( data['status'] == 'error' )
        {
           if( data['code'] == 101 )
           {
             this.errors.push('Unexpected Error');
           }
        }
        else if( data['status'] == 'success' && data['code'] == 200 )
        {
          //localStorage.setItem('token',data['data']);
  
          this.router.navigate(['/viewer/textsliders']);
        }
      })  
    }
}

checkForm():boolean{
      
  this.errors = [];

  if (!this.form.text) {
    this.errors.push('نص الشريط مطلوب.');
  }

  if (!this.form.seconds) {
    this.errors.push('عدد الثواني مطلوب.');
  }

  if (!this.form.textsize) {
    this.errors.push('حجم الخط مطلوب.');
  }


  if (this.errors.length == 0) {
    return true;
  }


  return false;
  //e.preventDefault();
}

}