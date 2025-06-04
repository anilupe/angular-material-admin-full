import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiempoModalComponent } from './tiempo-modal.component';

describe('TiempoModalComponent', () => {
  let component: TiempoModalComponent;
  let fixture: ComponentFixture<TiempoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiempoModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TiempoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
