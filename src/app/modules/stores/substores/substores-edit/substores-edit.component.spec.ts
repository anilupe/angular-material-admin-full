import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubStoresEditComponent } from './substores-edit.component';

describe('StoresEditComponent', () => {
  let component: SubStoresEditComponent;
  let fixture: ComponentFixture<SubStoresEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubStoresEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubStoresEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
