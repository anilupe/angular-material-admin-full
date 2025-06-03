import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesModalComponent } from './taxes-modal.component';

describe('TaxesModalComponent', () => {
  let component: TaxesModalComponent;
  let fixture: ComponentFixture<TaxesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
