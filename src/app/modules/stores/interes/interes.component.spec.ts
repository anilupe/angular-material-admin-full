import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresComponent } from './interes.component';

describe('InteresComponent', () => {
  let component: InteresComponent;
  let fixture: ComponentFixture<InteresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InteresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
