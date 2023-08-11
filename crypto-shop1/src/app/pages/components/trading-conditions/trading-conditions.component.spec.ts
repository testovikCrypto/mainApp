import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingConditionsComponent } from './trading-conditions.component';

describe('TradingConditionsComponent', () => {
  let component: TradingConditionsComponent;
  let fixture: ComponentFixture<TradingConditionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingConditionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradingConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
