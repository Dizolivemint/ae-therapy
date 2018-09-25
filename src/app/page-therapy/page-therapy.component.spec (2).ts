import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTherapyComponent } from './page-therapy.component';

describe('PageTherapyComponent', () => {
  let component: PageTherapyComponent;
  let fixture: ComponentFixture<PageTherapyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTherapyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTherapyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
