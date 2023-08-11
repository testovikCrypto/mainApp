import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInfoBlockComponent } from './additional-info-block.component';

describe('AdditionalInfoBlockComponent', () => {
  let component: AdditionalInfoBlockComponent;
  let fixture: ComponentFixture<AdditionalInfoBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInfoBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInfoBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
