import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  form = { fullname:'', password:'', password2:'' , email:''};
  errors = [];
  constructor(
    private http: HttpClient , 
    private router: Router ) { }

  ngOnInit(): void {
  }

  register():void{
    
    if( this.checkForm() )
    {
      this.http.post<HttpResponse<any>[]>("users/register",this.form)
      .subscribe(data => {

        if( data['status'] == 'error' )
        {
           if( data['code'] == 101 )
           {
             this.errors.push('User already exists');
           }
        }
        else if( data['status'] == 'success' && data['code'] == 200 )
        {
          localStorage.setItem('token',data['data']);
  
          this.router.navigate(['/']);

        }
      })  
    }
  }

  checkForm():boolean{
      
    this.errors = [];

    if (!this.form.email) {
      this.errors.push('Email required.');
    }

    if (!this.form.fullname) {
      this.errors.push('Name required.');
    }

    if (!this.form.password) {
      this.errors.push('Password required.');
    }

    if (!this.form.password2) {
      this.errors.push('Password confirmation required.');
    }
    
    if (this.errors.length == 0) {
      return true;
    }


    return false;
    //e.preventDefault();
  }

}
