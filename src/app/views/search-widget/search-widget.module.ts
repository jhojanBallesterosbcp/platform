import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchWidgetRoutingModule } from './search-widget-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SearchWidgetService } from '../../services/search-widget.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchWidgetRoutingModule,
		HttpClientModule
  ],
	providers:[SearchWidgetService]
})
export class SearchWidgetModule { }
