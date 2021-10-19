import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolModComponent } from './pool-mod.component';

describe('PoolModComponent', () => {
  let component: PoolModComponent;
  let fixture: ComponentFixture<PoolModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoolModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
