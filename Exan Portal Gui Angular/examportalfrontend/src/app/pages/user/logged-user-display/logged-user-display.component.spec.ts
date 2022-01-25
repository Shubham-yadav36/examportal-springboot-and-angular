import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedUserDisplayComponent } from './logged-user-display.component';

describe('LoggedUserDisplayComponent', () => {
  let component: LoggedUserDisplayComponent;
  let fixture: ComponentFixture<LoggedUserDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggedUserDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggedUserDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
