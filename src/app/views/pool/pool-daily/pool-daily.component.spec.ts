import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolDailyComponent } from './pool-daily.component';

describe('PoolDailyComponent', () => {
  let component: PoolDailyComponent;
  let fixture: ComponentFixture<PoolDailyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolDailyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
