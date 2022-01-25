import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdteProfileComponent } from './updte-profile.component';

describe('UpdteProfileComponent', () => {
  let component: UpdteProfileComponent;
  let fixture: ComponentFixture<UpdteProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdteProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdteProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
