import { Component, ElementRef, ViewChild, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoService, Video } from '../videodata.service';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'videojs-contrib-quality-levels';
import 'videojs-http-source-selector';
import 'jb-videojs-hls-quality-selector';

interface CustomPlayer extends Player {
  hlsQualitySelector: (options?: any) => void;
}

@Component({
  selector: 'app-videoplayer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './videoplayer.component.html',
  styleUrl: './videoplayer.component.scss'
})

export class VideoPlayerComponent implements OnChanges {
  videoUrl!: string;
  @Input() videoId!: number;
  @ViewChild('myvideo', { static: true }) myvideo!: ElementRef;
  player!: CustomPlayer;

  constructor(private videoService: VideoService) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId'] && !changes['videoId'].firstChange) {
      this.loadVideo(changes['videoId'].currentValue);
    }
  }

  ngOnInit() {
    this.loadVideo(this.videoId);
  }

  loadVideo(videoId: number) {
    this.videoService.getVideo(videoId).subscribe(video => {
      this.initializePlayer(video.video_master_m3u8);
    });
  }

  initializePlayer(videoUrl: string) {
    if (this.player) {
      this.player.src({ src: videoUrl, type: 'application/x-mpegURL' });
      return;
    }

    const options = {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      aspectRatio: '16:9',
      sources: [{ src: videoUrl, type: 'application/x-mpegURL' }]
    };

    this.player = videojs(this.myvideo.nativeElement, options) as CustomPlayer;
    this.initializePlugins();
  }

  initializePlugins() {
    if (this.player.hlsQualitySelector) {
      this.player.hlsQualitySelector({
        displayCurrentQuality: true,
        vjsIconClass: 'vjs-icon-cog'
      });
    } else {
      console.error('hlsQualitySelector plugin is not available');
    }
  }

  ngOnDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
}