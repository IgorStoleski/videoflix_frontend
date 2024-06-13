import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoflixAnimationComponent } from './videoflix-animation.component';

describe('VideoflixAnimationComponent', () => {
  let component: VideoflixAnimationComponent;
  let fixture: ComponentFixture<VideoflixAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoflixAnimationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoflixAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
