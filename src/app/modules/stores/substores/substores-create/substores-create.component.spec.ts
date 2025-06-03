import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubstoresCreateComponent } from './substores-create.component';

describe('SubstoresCreateComponent', () => {
  let component: SubstoresCreateComponent;
  let fixture: ComponentFixture<SubstoresCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubstoresCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubstoresCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
