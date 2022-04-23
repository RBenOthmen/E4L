import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetUserItemComponent } from './meet-user-item.component';

describe('MeetUserItemComponent', () => {
  let component: MeetUserItemComponent;
  let fixture: ComponentFixture<MeetUserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeetUserItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
