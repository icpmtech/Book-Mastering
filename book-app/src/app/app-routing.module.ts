import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from './auth/guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
  },
 
  {
    path: 'secured-feat',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./features/secured-feat/secured-feat.module').then(
        m => m.SecuredFeatModule
      ),
  },
  {
    path: 'book',
   canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./features/book/book.module').then(
        m => m.BookModule
      ),
  },
  {
    path: 'chapter',
   canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./features/chapter/chapter.module').then(
        m => m.ChapterModule
      ),
  },
  {
    path: 'section',
   canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./features/section/section.module').then(
        m => m.SectionModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
