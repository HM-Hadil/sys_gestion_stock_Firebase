import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDemandeTchComponent } from './liste-demande-tch.component';

describe('ListeDemandeTchComponent', () => {
  let component: ListeDemandeTchComponent;
  let fixture: ComponentFixture<ListeDemandeTchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDemandeTchComponent]
    });
    fixture = TestBed.createComponent(ListeDemandeTchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
