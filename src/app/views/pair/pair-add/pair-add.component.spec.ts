import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PairAddComponent } from './pair-add.component';

describe('PairAddComponent', () => {
  let component: PairAddComponent;
  let fixture: ComponentFixture<PairAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PairAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PairAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
