import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MyComponentComponent } from './my-component/my-component.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RouterModule,Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import AuthGuard from './auth-guard.guard';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user/:id', component: UserComponent,canActivate: [AuthGuard] },
];
@NgModule({
  declarations: [
    AppComponent,
    MyComponentComponent,
    HomeComponent,
    AboutComponent,
    UserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
