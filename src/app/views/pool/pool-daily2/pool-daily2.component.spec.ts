import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolDaily2Component } from './pool-daily2.component';

describe('PoolDaily2Component', () => {
  let component: PoolDaily2Component;
  let fixture: ComponentFixture<PoolDaily2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolDaily2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolDaily2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
