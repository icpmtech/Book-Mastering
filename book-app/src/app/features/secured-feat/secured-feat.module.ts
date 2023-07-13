import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiNotificationModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';

import { SecuredFeatComponent } from './secured-feat.component';

const routes: Routes = [{ path: '', component: SecuredFeatComponent }];

@NgModule({
  imports: [
    CommonModule,
    TuiNotificationModule,
    TuiBadgeModule,
    RouterModule.forChild(routes),
  ],
  declarations: [SecuredFeatComponent],
})
export class SecuredFeatModule {}
