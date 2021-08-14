import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private http: HttpClient ) { }

  profileData = {};

  ngOnInit(): void {
    this.http.get<HttpResponse<any>[]>("users/getProfile")
    .subscribe(resp => {
console.log("profile",resp);
        this.profileData = resp['data'];
        //window['circuits'].clear();
        //localStorage.setItem('circuit',resp['data']['json']);
        //window['circuits'].loadSession();

        //this.circuitTitle = resp['data']['title'] || '';
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

  }

  updateProfile(): void{

    this.http.post<HttpResponse<any>[]>("users/updateProfile",this.profileData)
    .subscribe(data => {

      if( data['code'] == '100' )
      {

      }
      else if( data['code'] == '200' )
      {

        //this.errors.push(this.$t('message.' + response.data.msg));
      }
  })  

  }

}
