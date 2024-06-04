import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeMtTeacherComponent } from './demande-mt-teacher.component';

describe('DemandeMtTeacherComponent', () => {
  let component: DemandeMtTeacherComponent;
  let fixture: ComponentFixture<DemandeMtTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandeMtTeacherComponent]
    });
    fixture = TestBed.createComponent(DemandeMtTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
