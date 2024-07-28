import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmpwComponent } from './confirmpw.component';

describe('ConfirmpwComponent', () => {
  let component: ConfirmpwComponent;
  let fixture: ComponentFixture<ConfirmpwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmpwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
