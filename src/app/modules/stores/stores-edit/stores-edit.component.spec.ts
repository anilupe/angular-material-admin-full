import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresEditComponent } from './stores-edit.component';

describe('StoresEditComponent', () => {
  let component: StoresEditComponent;
  let fixture: ComponentFixture<StoresEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoresEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
