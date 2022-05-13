import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicRecordComponent } from './mic-record.component';

describe('MicRecordComponent', () => {
  let component: MicRecordComponent;
  let fixture: ComponentFixture<MicRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
