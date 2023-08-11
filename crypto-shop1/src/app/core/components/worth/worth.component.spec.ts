import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorthComponent } from './worth.component';

describe('WorthComponent', () => {
  let component: WorthComponent;
  let fixture: ComponentFixture<WorthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
