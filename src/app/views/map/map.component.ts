import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
userId:any=''

	ngOnInit(): void {
		this.userId = localStorage.getItem('userId')
	}

}
