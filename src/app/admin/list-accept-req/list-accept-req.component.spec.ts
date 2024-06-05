import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAcceptReqComponent } from './list-accept-req.component';

describe('ListAcceptReqComponent', () => {
  let component: ListAcceptReqComponent;
  let fixture: ComponentFixture<ListAcceptReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAcceptReqComponent]
    });
    fixture = TestBed.createComponent(ListAcceptReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
