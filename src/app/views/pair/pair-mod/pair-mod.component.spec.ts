import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairModComponent } from './pair-mod.component';

describe('PairModComponent', () => {
  let component: PairModComponent;
  let fixture: ComponentFixture<PairModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PairModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
