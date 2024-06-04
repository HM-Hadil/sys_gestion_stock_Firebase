import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydemandeStudentComponent } from './mydemande-student.component';

describe('MydemandeStudentComponent', () => {
  let component: MydemandeStudentComponent;
  let fixture: ComponentFixture<MydemandeStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MydemandeStudentComponent]
    });
    fixture = TestBed.createComponent(MydemandeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
