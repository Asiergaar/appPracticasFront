import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenModComponent } from './token-mod.component';

describe('TokenModComponent', () => {
  let component: TokenModComponent;
  let fixture: ComponentFixture<TokenModComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenModComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
