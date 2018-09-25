import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MilesliderComponent } from './mileslider.component';

describe('MilesliderComponent', () => {
  let component: MilesliderComponent;
  let fixture: ComponentFixture<MilesliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MilesliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MilesliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
