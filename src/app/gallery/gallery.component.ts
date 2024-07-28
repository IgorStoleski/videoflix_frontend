import { Component, OnInit, Input } from '@angular/core';
import { VideoService, Video } from '../videodata.service';
import { MatDialog } from '@angular/material/dialog';
import { VideoplayermodalComponent } from '../videoplayermodal/videoplayermodal.component';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent implements OnInit {
  @Input() genre!: string; // Genre als Input
  videos: Video[] = [];

  constructor(private videoService: VideoService, public dialog: MatDialog) {}

  ngOnInit() {
    this.videoService.getVideosByGenre(this.genre).subscribe(videos => {
      this.videos = videos;
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
