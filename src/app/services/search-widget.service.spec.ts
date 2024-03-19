import { TestBed } from '@angular/core/testing';

import { SearchWidgetService } from './search-widget.service';

describe('SearchWidgetService', () => {
  let service: SearchWidgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchWidgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
