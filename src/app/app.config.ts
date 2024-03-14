import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading, withViewTransitions } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './app.routes';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

export const appConfig: ApplicationConfig = {


  providers: [
  
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(ReactiveFormsModule),
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'longDate'}},
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withDebugTracing(),
      withViewTransitions()
    ),
  ]
};