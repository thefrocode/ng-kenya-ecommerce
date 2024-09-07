import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';

import { routes } from './app.routes';
import { getAppConfigProvider } from './shared/app-config/app-config.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    getAppConfigProvider(environment),
    provideHttpClient(),
    importProvidersFrom(ToastrModule.forRoot()),
  ],
};
