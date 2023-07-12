import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { ConfigService, GoogleAnalyticsService } from '../core/services';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform';
@Component({
  selector: 'book-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  isOnline!: boolean;
  modalVersion!: boolean;
  
  modalPwaEvent: any;
  modalPwaPlatform: string|undefined;
  constructor(
    private platform: Platform,
    private swUpdate: SwUpdate,
    private router: Router,
    private configService: ConfigService,
    private googleAnalyticsService: GoogleAnalyticsService
  ) {

    this.isOnline = false;
    this.modalVersion = false;
  }

  ngOnInit() {
    if (this.configService.isProd()) {
      this.setupGoogleAnalytics();
    }
    this.updateOnlineStatus();

    window.addEventListener('online',  this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(
        filter((evt: any): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        map((evt: any) => {
          console.info(`currentVersion=[${evt.currentVersion} | latestVersion=[${evt.latestVersion}]`);
          this.modalVersion = true;
        }),
      );
    }

    this.loadModalPwa();
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }

  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
  }

  private loadModalPwa(): void {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.modalPwaEvent = event;
        this.modalPwaPlatform = 'ANDROID';
      });
    }

    if (this.platform.IOS && this.platform.SAFARI) {
      const isInStandaloneMode = ('standalone' in window.navigator) && ((<any>window.navigator)['standalone']);
      if (!isInStandaloneMode) {
        this.modalPwaPlatform = 'IOS';
      }
    }
  }

  public addToHomeScreen(): void {
    this.modalPwaEvent.prompt();
    this.modalPwaPlatform = undefined;
  }

  public closePwa(): void {
    this.modalPwaPlatform = undefined;
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









