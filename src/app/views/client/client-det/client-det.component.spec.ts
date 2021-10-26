import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetComponent } from './client-det.component';

describe('ClientDetComponent', () => {
  let component: ClientDetComponent;
  let fixture: ComponentFixture<ClientDetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
