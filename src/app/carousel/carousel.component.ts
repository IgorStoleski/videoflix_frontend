import { Component, EventEmitter, Output, OnInit, Input  } from '@angular/core';
import { VideoService, Video } from '../videodata.service';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    CarouselModule
  ],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit {
  @Input() genre!: string; // Genre als Input
  @Output() videoSelected = new EventEmitter<number>();
  videos: Video[] = [];
  numVisible: number = 4;

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getVideosByGenre(this.genre).subscribe(videos => {
      this.videos = videos;
    });
    this.updateNumVisible();
    window.addEventListener('resize', this.updateNumVisible.bind(this));
  }

  playVideo(videoId: number) {
    this.videoSelected.emit(videoId);
  }

  updateNumVisible() {
    const width = window.innerWidth;
    if (width >= 1200) {
      this.numVisible = 4;
    } else if (width >= 992) {
      this.numVisible = 3;
    } else if (width >= 768) {
      this.numVisible = 2;
    } else {
      this.numVisible = 1;
    }
  }
}

