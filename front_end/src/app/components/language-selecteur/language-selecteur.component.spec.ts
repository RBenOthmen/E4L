import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelecteurComponent } from './language-selecteur.component';

describe('LanguageSelecteurComponent', () => {
  let component: LanguageSelecteurComponent;
  let fixture: ComponentFixture<LanguageSelecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageSelecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageSelecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
