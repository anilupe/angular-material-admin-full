import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorEntradaModalComponent } from './valor-entrada-modal.component';

describe('ValorEntradaModalComponent', () => {
  let component: ValorEntradaModalComponent;
  let fixture: ComponentFixture<ValorEntradaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValorEntradaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValorEntradaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
