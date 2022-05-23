import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerMainComponent } from './messenger-main.component';

describe('MessengerMainComponent', () => {
  let component: MessengerMainComponent;
  let fixture: ComponentFixture<MessengerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
