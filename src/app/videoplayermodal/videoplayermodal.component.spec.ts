import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoplayermodalComponent } from './videoplayermodal.component';

describe('VideoplayermodalComponent', () => {
  let component: VideoplayermodalComponent;
  let fixture: ComponentFixture<VideoplayermodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoplayermodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoplayermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
