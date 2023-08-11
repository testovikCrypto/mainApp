import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSpacerComponent } from './header-spacer.component';

describe('HeaderSpacerComponent', () => {
  let component: HeaderSpacerComponent;
  let fixture: ComponentFixture<HeaderSpacerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSpacerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderSpacerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
