import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DokuComponent } from './doku.component';

describe('DokuComponent', () => {
  let component: DokuComponent;
  let fixture: ComponentFixture<DokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DokuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
