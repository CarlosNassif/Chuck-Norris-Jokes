import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/search-page/search-page.module').then(
        (e) => e.SearchPageModule
      ),
  },
  {
    path: 'results',
    loadChildren: () =>
      import('./pages/results-page/results-page.module').then(
        (e) => e.ResultsPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
