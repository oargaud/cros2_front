import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


// trick pour avoir les dates en francais par defaut
  import { registerLocaleData } from '@angular/common';
  import localeFr from '@angular/common/locales/fr';
  registerLocaleData(localeFr, 'en');



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
