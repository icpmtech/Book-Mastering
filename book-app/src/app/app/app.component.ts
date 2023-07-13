import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { ConfigService, GoogleAnalyticsService } from '../core/services';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform';
import { OneSignal } from 'onesignal-ngx';
@Component({
  selector: 'book-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  constructor(
    private oneSignal: OneSignal,
    
    private router: Router,
    private configService: ConfigService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {

    this.oneSignal.init({
      appId: "8e7fe838-fbcd-4152-980d-32565a2dcf03",
    });
  }

  ngOnInit() {
    if (this.configService.isProd()) {
      this.setupGoogleAnalytics();
    }
  }


private setupGoogleAnalytics() {
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(navigationEndEvent => {
      this.googleAnalyticsService.sendPageView(
        (navigationEndEvent as NavigationEnd).urlAfterRedirects
      );
    });
}
  
}









