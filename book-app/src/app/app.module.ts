import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiDialogModule, TuiNotificationModule, TuiRootModule, TuiAlertModule, TUI_SANITIZER } from '@taiga-ui/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { CoreModule } from './core/core.module';
import { FooterModule } from './shared/ui/footer/footer.module';
import { HeaderModule } from './shared/ui/header/header.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,

    // Taiga UI
    TuiRootModule,
    TuiDialogModule,
    TuiNotificationModule,

    // Core
    CoreModule,

    // Application
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreRouterConnectingModule.forRoot(),
    FontAwesomeModule,
      TuiAlertModule
],
  providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
  bootstrap: [AppComponent],
})
export class AppModule {}
