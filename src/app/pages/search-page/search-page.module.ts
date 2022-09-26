import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { ChuckNorrisService } from '../../services/chuck-norris/chuck-norris.service';
import { SearchPageRoutingModule } from './search-page-routing.module';
import { SearchPageComponent } from './search-page.component';

@NgModule({
  declarations: [SearchPageComponent],
  imports: [CommonModule, HttpClientModule, SearchPageRoutingModule],
  providers: [ChuckNorrisService],
  exports: [SearchPageComponent],
})
export class SearchPageModule {}
