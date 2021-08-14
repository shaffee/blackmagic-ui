import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

window['selectedComponent'] = '';
window['wireColors'] = [ "#0076ee" , "#e42090" ];
//enableProdMode();
//console.log = function() {}

if (environment.production) {
  enableProdMode();
}


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
