import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map.component';

const routes: Routes = [
	{
		path:'',
		data:{
			title:'maps'
		},
		children:[
			{
				path:'',
				pathMatch:'full',
				redirectTo:'maps'
			},
			{
				path:'maps',
				component: MapComponent,
				data:{
					title:'maps'
				}
			}
		]
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
