import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TuiButtonModule, TuiNotificationModule } from '@taiga-ui/core';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { IconModule } from '../../shared/ui/icon/icon.module';
import { BookComponent } from './book.component';

const routes: Routes = [{ path: '', component: BookComponent }];

@NgModule({
  imports: [
    CommonModule,
    IconModule,
    TuiButtonModule,
    TuiNotificationModule,
    TuiBadgeModule,
    RouterModule.forChild(routes),
  ],
  declarations: [BookComponent],
})
export class BookModule {}
