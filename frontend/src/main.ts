import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  
}
window['selectedComponent'] = '';
window['wireColors'] = [ "#0076ee" , "#e42090" ];
//enableProdMode();
//console.log = function() {}



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
