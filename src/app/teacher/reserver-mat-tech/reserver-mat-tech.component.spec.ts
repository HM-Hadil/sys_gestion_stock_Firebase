import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserverMatTechComponent } from './reserver-mat-tech.component';

describe('ReserverMatTechComponent', () => {
  let component: ReserverMatTechComponent;
  let fixture: ComponentFixture<ReserverMatTechComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserverMatTechComponent]
    });
    fixture = TestBed.createComponent(ReserverMatTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
