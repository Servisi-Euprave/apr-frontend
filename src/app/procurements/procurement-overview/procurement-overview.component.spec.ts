import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementOverviewComponent } from './procurement-overview.component';

describe('ProcurementOverviewComponent', () => {
  let component: ProcurementOverviewComponent;
  let fixture: ComponentFixture<ProcurementOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcurementOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
