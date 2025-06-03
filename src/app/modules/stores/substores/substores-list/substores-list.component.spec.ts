import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstoresListComponent } from './substores-list.component';

describe('SubstoresListComponent', () => {
  let component: SubstoresListComponent;
  let fixture: ComponentFixture<SubstoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstoresListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
