import { Component, AfterViewInit, ElementRef } from '@angular/core';
import {SearchWidgetService} from 'src/app/services/search-widget.service';

@Component({
  selector: 'app-energy-widget',
  templateUrl: './energy-widget.component.html',
  styleUrls: ['./energy-widget.component.scss']
})
export class EnergyWidgetComponent implements AfterViewInit {

	constructor(private el: ElementRef, private search : SearchWidgetService){}
	userId:any=''
	configId:any='ab538cf2-6f58-4c94-8c31-479f9d3e82cf'

	ngAfterViewInit(): void {
		this.search.loadScript(
			'https://cloud.google.com/ai/gen-app-builder/client?hl=en_US'
		).then(() => {
			this.initWidget();
		});
	}
	private initWidget() {
		const searchWidget = document.createElement('gen-search-widget');
		searchWidget.setAttribute('configId', this.configId);
		searchWidget.setAttribute('triggerId', 'searchWidgetTrigger');
	
		const triggerInput = document.createElement('input');
		triggerInput.setAttribute('placeholder', 'Search here');
		triggerInput.id = 'searchWidgetTrigger';
	
		const widgetContainer = this.el.nativeElement.querySelector('#widgetContainer');
		const shadowRoot = searchWidget.attachShadow({mode: 'open'});
	
		// Asegúrate de que el Shadow DOM esté disponible
		if (shadowRoot) {
			// Agrega estilos o manipula el Shadow DOM aquí
			const styleElement = document.createElement('style');
			styleElement.textContent = `
				div .backdrop {
					padding-top:100px!important;
				}
			`;
			shadowRoot.appendChild(styleElement);
	
			widgetContainer.appendChild(triggerInput);
			widgetContainer.appendChild(searchWidget);
		} else {
			console.error('Shadow DOM no está disponible');
		}
	
	}
}
