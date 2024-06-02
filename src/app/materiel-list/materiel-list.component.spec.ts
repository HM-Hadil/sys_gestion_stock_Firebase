import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielListComponent } from './materiel-list.component';

describe('MaterielListComponent', () => {
  let component: MaterielListComponent;
  let fixture: ComponentFixture<MaterielListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterielListComponent]
    });
    fixture = TestBed.createComponent(MaterielListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
