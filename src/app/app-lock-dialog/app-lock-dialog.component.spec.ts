import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLockDialogComponent } from './app-lock-dialog.component';

describe('AppLockDialogComponent', () => {
  let component: AppLockDialogComponent;
  let fixture: ComponentFixture<AppLockDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppLockDialogComponent]
    });
    fixture = TestBed.createComponent(AppLockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
