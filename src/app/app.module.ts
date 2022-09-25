import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchPageModule } from './pages/search-page/search-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SearchPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
