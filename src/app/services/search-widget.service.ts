import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchWidgetService {
	private scriptLoaded = false;

  loadScript(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (this.scriptLoaded) {
        resolve();
        return;
      }

      const scriptElement = document.createElement('script');
      scriptElement.src = url;

      scriptElement.onload = () => {
        this.scriptLoaded = true;
        resolve();
      };

      scriptElement.onerror = (error) => reject(error);

      document.body.appendChild(scriptElement);
    });
  }
}
