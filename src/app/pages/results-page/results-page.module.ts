import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ResultsPageRoutingModule } from './results-page-routing.module';
import { ResultsPageComponent } from './results-page.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@NgModule({
  declarations: [ResultsPageComponent],
  imports: [CommonModule, ResultsPageRoutingModule, MatProgressSpinnerModule],
  exports: [ResultsPageComponent],
})
export class ResultsPageModule {}
