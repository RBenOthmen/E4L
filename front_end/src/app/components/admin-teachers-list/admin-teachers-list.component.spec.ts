import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeachersListComponent } from './admin-teachers-list.component';

describe('AdminTeachersListComponent', () => {
  let component: AdminTeachersListComponent;
  let fixture: ComponentFixture<AdminTeachersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTeachersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTeachersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
