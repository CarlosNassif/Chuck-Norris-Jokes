import { JOKES_RESPONSE_EXAMPLE } from './../../../test/JokesResponseExample';
import { ResultsPageModule } from './results-page.module';
import { ChuckNorrisService } from './../../services/chuck-norris/chuck-norris.service';
import { of } from 'rxjs';
import { Compiler, Injector, Optional, Provider } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import {
  Router,
  ActivatedRoute,
  UrlSerializer,
  ChildrenOutletContexts,
  ROUTES,
  TitleStrategy,
  ROUTER_CONFIGURATION,
  UrlHandlingStrategy,
  RouteReuseStrategy,
  ParamMap,
} from '@angular/router';
import {
  RouterTestingModule,
  setupTestingRouterInternal,
} from '@angular/router/testing';

import { ResultsPageComponent } from './results-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { Location } from '@angular/common';

class DummyComponent {}

class MockActivatedRoute {
  params: {
    [key: string]: string;
  } = {};
  constructor(query: string) {
    this.params['query'] = query;
  }

  get(key: string) {
    return this.params[key];
  }
}

describe('ResultsPageComponent', () => {
  let component: ResultsPageComponent;
  let fixture: ComponentFixture<ResultsPageComponent>;
  let routerSpy: any;
  let chuckNorrisService: any;
  let chuckNorrisServiceSpy: any;
  let el: any;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj(Router, ['navigate']);
    chuckNorrisServiceSpy = jasmine.createSpyObj(ChuckNorrisService, [
      'getJokes',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'results',
            component: DummyComponent,
          },
          {
            path: '',
            component: DummyComponent,
          },
        ]),
        ResultsPageModule,
      ],
      declarations: [ResultsPageComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(new MockActivatedRoute('initial value')),
          },
        },
        {
          provide: ChuckNorrisService,
          useValue: chuckNorrisServiceSpy,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultsPageComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', fakeAsync(() => {
    expect(component).toBeTruthy();
    flush();
    expect(component.query).toBe('initial value');
  }));
});
