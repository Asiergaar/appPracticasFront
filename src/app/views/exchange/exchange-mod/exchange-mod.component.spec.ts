import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeModComponent } from './exchange-mod.component';

describe('ExchangeModComponent', () => {
  let component: ExchangeModComponent;
  let fixture: ComponentFixture<ExchangeModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
