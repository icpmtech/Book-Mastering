import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faLinkedinIn,
  faSquareYoutube,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import { faStar, faBook, faLink } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconModule {
  private icons = [faSquareYoutube,faGithub, faMediumM, faTwitter, faLinkedinIn,faYoutube, faStar, faBook, faLink];

  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(...this.icons);
  }
}
