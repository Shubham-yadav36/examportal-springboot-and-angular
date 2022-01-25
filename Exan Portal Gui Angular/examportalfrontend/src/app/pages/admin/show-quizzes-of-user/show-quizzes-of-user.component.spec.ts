import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowQuizzesOfUserComponent } from './show-quizzes-of-user.component';

describe('ShowQuizzesOfUserComponent', () => {
  let component: ShowQuizzesOfUserComponent;
  let fixture: ComponentFixture<ShowQuizzesOfUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowQuizzesOfUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowQuizzesOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
