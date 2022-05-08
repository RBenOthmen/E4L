import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmUsersComponent } from './tm-users.component';

describe('TmUsersComponent', () => {
  let component: TmUsersComponent;
  let fixture: ComponentFixture<TmUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
