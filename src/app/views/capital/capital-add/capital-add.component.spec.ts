import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalAddComponent } from './capital-add.component';

describe('CapitalAddComponent', () => {
  let component: CapitalAddComponent;
  let fixture: ComponentFixture<CapitalAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapitalAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapitalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
