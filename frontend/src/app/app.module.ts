import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LsComponent } from './ls/ls.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ApiInterceptor } from './helpers/ApiInterceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { CircuitsGuardGuard } from './circuits-guard.guard';
import { OpenComponent } from './open/open.component';
import { SideTabsComponent } from './side-tabs/side-tabs.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewerComponent } from './viewer/viewer.component';
import { TextslidersComponent } from './textsliders/textsliders.component';
import { AddtextsliderComponent } from './addtextslider/addtextslider.component';
import { GreenscreenComponent } from './greenscreen/greenscreen.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsTabsComponent } from './settings-tabs/settings-tabs.component';
import { SettingsDesignerComponent } from './settings-designer/settings-designer.component';
import { SettingsAnimationsComponent } from './settings-animations/settings-animations.component';
import { SettingsFontsComponent } from './settings-fonts/settings-fonts.component';
import { SettingsAdvancedComponent } from './settings-advanced/settings-advanced.component';
import { TathweebComponent } from './tathweeb/tathweeb.component'
import { NgMarqueeModule } from 'ng-marquee';
import { NgTickerModule } from 'ng-ticker';

const routes: Routes = [
  { path: 'viewer', component:ViewerComponent  ,
      children: [
        { path: 'textsliders' , component:TextslidersComponent},
        { path: 'addtextslider' , component:AddtextsliderComponent},
        { path: 'tathweeb' , component:TathweebComponent},
        { path: '' , component:HomeComponent},
      ]},
  { path: 'screen/:zoom', component:GreenscreenComponent   },
  { path: 'settings' , component:SettingsComponent,
      children: [
        { path: 'designer' , component:SettingsDesignerComponent},
        { path: 'fonts' , component:SettingsFontsComponent},
        { path: 'animations' , component:SettingsAnimationsComponent},
        { path: 'advanced' , component:SettingsAdvancedComponent},
      ]},
  { path: '', component: HomeComponent }
]; // sets up routes constant where you define your routes


export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
    LsComponent,
    HomeComponent,
    OpenComponent,
    SideTabsComponent,
    ProfileComponent,
    ViewerComponent,
    TextslidersComponent,
    AddtextsliderComponent,
    GreenscreenComponent,
    SettingsComponent,
    SettingsTabsComponent,
    SettingsDesignerComponent,
    SettingsAnimationsComponent,
    SettingsFontsComponent,
    SettingsAdvancedComponent,
    TathweebComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    NgMarqueeModule,
    NgTickerModule,
    RouterModule.forRoot(routes,{enableTracing: true, /* <-- debugging purposes only*/}),
    JwtModule.forRoot({
      config: {
        tokenGetter:tokenGetter,
        allowedDomains: ["localhost:4200","localhost:3000","example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),

  ],
  exports: [RouterModule],
  providers: [ 
    CircuitsGuardGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
  }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
