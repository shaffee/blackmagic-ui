import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = {email:'',password:''};
  errors = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void{
          this.http.post<HttpResponse<any>[]>("users/login",this.form)
          .subscribe(data => {
    
            if( data['code'] == '100' )
            {
              this.errors.push('Wrong Credentials');
              localStorage.setItem('token',null);
            }
            else if( data['code'] == '200' )
            {
              console.log("setting token" , data['data']);
              localStorage.setItem('token',data['data']);
  
              this.router.navigate(['/']);
  
              //this.errors.push(this.$t('message.' + response.data.msg));
            }
        })  
    
  }
}
