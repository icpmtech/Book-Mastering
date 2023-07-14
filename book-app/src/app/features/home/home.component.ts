/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';

import { Feature, features } from './features.data';

@Component({
  selector: 'book-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  showAllFeatures = false;

  get features(): Feature[] {
    return this.showAllFeatures ? features : features.slice(0, 8);
  }
}
