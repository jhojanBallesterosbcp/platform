import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWidgetComponent } from './search-widget.component';

describe('SearchWidgetComponent', () => {
  let component: SearchWidgetComponent;
  let fixture: ComponentFixture<SearchWidgetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchWidgetComponent]
    });
    fixture = TestBed.createComponent(SearchWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
