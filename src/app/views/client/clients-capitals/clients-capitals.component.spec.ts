import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsCapitalsComponent } from './clients-capitals.component';

describe('ClientsCapitalsComponent', () => {
  let component: ClientsCapitalsComponent;
  let fixture: ComponentFixture<ClientsCapitalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientsCapitalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsCapitalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
