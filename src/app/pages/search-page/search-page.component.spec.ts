import { Provider } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  flush,
  flushMicrotasks,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchPageComponent } from './search-page.component';

class DummyComponent {}

describe('SearchPageComponent', () => {
  let component: SearchPageComponent;
  let fixture: ComponentFixture<SearchPageComponent>;
  let routerSpy: any;
  let el: any;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj(Router, ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'results',
            component: DummyComponent,
          },
        ]),
      ],
      declarations: [SearchPageComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        } as Provider,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect on search', fakeAsync(() => {
    const query = 'test';
    component.searchJokes(query);
    tick(1001);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/results'], {
      queryParams: { query },
    });
    expect(routerSpy.navigate.calls.count()).toEqual(1);
  }));

  it('should call search on keyup', fakeAsync(() => {
    el = fixture.debugElement;

    const searchbar = (el.nativeElement as HTMLElement).getElementsByTagName(
      'input'
    )[0];
    const query = 'test';
    searchbar.value = query;
    searchbar.dispatchEvent(new KeyboardEvent('keyup'));
    tick(1001);
    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/results'], {
      queryParams: { query },
    });
    flush();
  }));

  it('should call search on Enter keydown', fakeAsync(() => {
    el = fixture.debugElement;

    const searchbar = (el.nativeElement as HTMLElement).getElementsByTagName(
      'input'
    )[0];
    const query = 'test';
    searchbar.value = query;
    searchbar.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
      })
    );
    tick(1001);
    expect(routerSpy.navigate.calls.count()).toEqual(1);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/results'], {
      queryParams: { query },
    });
    flush();
  }));
});
