import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerFullViewComponent } from './messenger-full-view.component';

describe('MessengerFullViewComponent', () => {
  let component: MessengerFullViewComponent;
  let fixture: ComponentFixture<MessengerFullViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerFullViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
