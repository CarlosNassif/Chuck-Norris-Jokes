import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResultsPageRoutingModule } from './results-page-routing.module';
import { ResultsPageComponent } from './results-page.component';

@NgModule({
  declarations: [ResultsPageComponent],
  imports: [CommonModule, ResultsPageRoutingModule],
  exports: [ResultsPageComponent],
})
export class ResultsPageModule {}
