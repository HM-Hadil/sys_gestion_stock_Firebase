import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReqAdminComponent } from './list-req-admin.component';

describe('ListReqAdminComponent', () => {
  let component: ListReqAdminComponent;
  let fixture: ComponentFixture<ListReqAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListReqAdminComponent]
    });
    fixture = TestBed.createComponent(ListReqAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
