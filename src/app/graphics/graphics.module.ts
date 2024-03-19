import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphicsRoutingModule } from './graphics-routing.module';
import { ForceDirectedGraphComponent } from './force-directed-graph/force-directed-graph.component';
import { CardModule, GridModule } from '@coreui/angular';


@NgModule({
  declarations: [
    ForceDirectedGraphComponent
  ],
  imports: [
    CardModule,
    GridModule,
    CommonModule,
    GraphicsRoutingModule
  ],
  exports: [
    ForceDirectedGraphComponent
  ]
})
export class GraphicsModule { }
