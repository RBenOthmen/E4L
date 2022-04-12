import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerUserItemComponent } from './messenger-user-item.component';

describe('MessengerUserItemComponent', () => {
  let component: MessengerUserItemComponent;
  let fixture: ComponentFixture<MessengerUserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerUserItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
