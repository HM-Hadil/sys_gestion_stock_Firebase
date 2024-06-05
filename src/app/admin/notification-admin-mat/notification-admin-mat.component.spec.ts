import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAdminMatComponent } from './notification-admin-mat.component';

describe('NotificationAdminMatComponent', () => {
  let component: NotificationAdminMatComponent;
  let fixture: ComponentFixture<NotificationAdminMatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationAdminMatComponent]
    });
    fixture = TestBed.createComponent(NotificationAdminMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
