import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { SearchWidgetService } from '../../services/search-widget.service';

@Component({
  selector: 'app-search-widget',
  templateUrl: './search-widget.component.html',
  styleUrls: ['./search-widget.component.scss']
})
export class SearchWidgetComponent implements AfterViewInit {
  constructor(private el: ElementRef, private search: SearchWidgetService) { }

  configId: any = '9e4c50b7-7905-41b3-9a09-a9d2ad4827ca'
  ngAfterViewInit(): void {

    this.search.loadScript(
      'https://cloud.google.com/ai/gen-app-builder/client?hl=es_419'
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
    const shadowRoot = searchWidget.attachShadow({ mode: 'open' }); // Acceder al shadow DOM
    console.log(shadowRoot)
    // Verificar si el Shadow DOM está disponible
    if (shadowRoot) {
      const styleElement = document.createElement('style');
      styleElement.textContent = `
      div .backdrop {
			padding-top:100px!important
      }
    `;
      shadowRoot.append(styleElement);
    } else {
      console.error('Shadow DOM no está disponible');
    }

    widgetContainer.appendChild(triggerInput);
    widgetContainer.appendChild(searchWidget);

  }

  /* <!-- Widget JavaScript bundle -->
  <script src="https://cloud.google.com/ai/gen-app-builder/client?hl=es_419"></script>
  
  <!-- Search widget element is not visible by default -->
  <gen-search-widget
    configId="6f37084d-8652-4923-be8b-583a9d1a8271"
    triggerId="searchWidgetTrigger">
  </gen-search-widget>
  
  <!-- Element that opens the widget on click. It does not have to be an input -->
  <input placeholder="Search here" id="searchWidgetTrigger" /> */

}
