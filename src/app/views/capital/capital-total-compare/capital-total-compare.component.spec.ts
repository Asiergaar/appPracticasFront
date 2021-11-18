import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalTotalCompareComponent } from './capital-total-compare.component';

describe('CapitalTotalCompareComponent', () => {
  let component: CapitalTotalCompareComponent;
  let fixture: ComponentFixture<CapitalTotalCompareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalTotalCompareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalTotalCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
