import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterielDetailComponent } from './materiel-detail.component';

describe('MaterielDetailComponent', () => {
  let component: MaterielDetailComponent;
  let fixture: ComponentFixture<MaterielDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaterielDetailComponent]
    });
    fixture = TestBed.createComponent(MaterielDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
