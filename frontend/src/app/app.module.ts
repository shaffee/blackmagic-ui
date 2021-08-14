import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StageComponent } from './stage/stage.component';
import { ComponentsComponent } from './components/components.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { LsComponent } from './ls/ls.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register/register.component'; // CLI imports router
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './user/login/login.component';
import { ApiInterceptor } from './helpers/ApiInterceptor';
import { JwtModule } from '@auth0/angular-jwt';
import { CircuitsGuardGuard } from './circuits-guard.guard';
import { OpenComponent } from './open/open.component';
import { PropertiesComponent } from './properties/properties.component';
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
import { SettingsFontsComponent } from './settings-fonts/settings-fonts.component'

const routes: Routes = [
  { path: 'viewer', component:ViewerComponent  ,
      children: [
        { path: 'textsliders' , component:TextslidersComponent},
        { path: 'addtextslider' , component:AddtextsliderComponent},
        { path: '' , component:HomeComponent},
      ]},
  { path: 'screen/:zoom', component:GreenscreenComponent   },
  { path: 'register', component:RegisterComponent  , canActivate: [CircuitsGuardGuard] },
  { path: 'login', component:LoginComponent , canActivate: [CircuitsGuardGuard] },
  { path: 'settings' , component:SettingsComponent,
      children: [
        { path: 'designer' , component:SettingsDesignerComponent},
        { path: 'fonts' , component:SettingsFontsComponent},
        { path: 'animations' , component:SettingsAnimationsComponent},
      ]},
  { path: '', component: HomeComponent }
]; // sets up routes constant where you define your routes


export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    StageComponent,
    ComponentsComponent,
    ToolbarComponent,
    LsComponent,
    NavbarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    OpenComponent,
    PropertiesComponent,
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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
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
