import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmViewProfileComponent } from './tm-view-profile.component';

describe('TmViewProfileComponent', () => {
  let component: TmViewProfileComponent;
  let fixture: ComponentFixture<TmViewProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmViewProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
