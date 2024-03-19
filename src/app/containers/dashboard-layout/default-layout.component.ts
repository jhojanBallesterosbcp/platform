import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { Router } from '@angular/router';

@Component({
	selector: 'app-dashboard',
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.scss'],
})
export class DefaultLayoutComponent implements OnInit {

	constructor(
		private router: Router

	) { }
	public navItems = navItems;
	userId: any = ''
	imgUrl: string = ''
	ngOnInit() {

	}




}
