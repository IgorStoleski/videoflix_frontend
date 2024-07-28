import { Component, OnInit } from '@angular/core';
import { VideoPlayerComponent } from '../videoplayer/videoplayer.component';
import { CarouselComponent } from "../carousel/carousel.component";
import { VideoService, Video } from '../videodata.service';
import { NgFor } from '@angular/common';
import { MaterialModule } from '../shared/module/material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { VideoplayermodalComponent } from '../videoplayermodal/videoplayermodal.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    VideoPlayerComponent,
    CarouselComponent,
    NgFor,
    MaterialModule,
    
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedVideoId = 20; // default video ID
  genre: string[] = [];

  constructor(private videoService: VideoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.videoService.getVideos().subscribe(videos => {
      this.genre = [...new Set(videos.map(video => video.genre))];
    });
  }


  onVideoSelected(videoId: number) {
    this.openVideoPlayerModal(videoId);
  }

  openVideoPlayerModal(videoId: number) {
    const dialogRef = this.dialog.open(VideoplayermodalComponent, {
      width: '80%',
      data: { videoId: videoId }
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
