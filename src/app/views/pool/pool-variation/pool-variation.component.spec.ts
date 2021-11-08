import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolVariationComponent } from './pool-variation.component';

describe('PoolVariationComponent', () => {
  let component: PoolVariationComponent;
  let fixture: ComponentFixture<PoolVariationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolVariationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolVariationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
