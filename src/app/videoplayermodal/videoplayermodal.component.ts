import { Component, OnInit, Inject } from '@angular/core';
import { MaterialModule } from '../shared/module/material/material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VideoPlayerComponent } from '../videoplayer/videoplayer.component';
import { VideoService, Video } from '../videodata.service';

@Component({
  selector: 'app-videoplayermodal',
  standalone: true,
  imports: [
    MaterialModule,
    VideoPlayerComponent
  ],
  templateUrl: './videoplayermodal.component.html',
  styleUrl: './videoplayermodal.component.scss'
})
export class VideoplayermodalComponent implements OnInit {
  videoId: number;
  video: Video | undefined; 


  constructor(
    public dialogRef: MatDialogRef<VideoplayermodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private videoService: VideoService  
  ) {
    this.videoId = data.videoId;
  }

  ngOnInit(): void {
    this.loadVideo(); // Load the video data when the component initializes
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  loadVideo(): void {
    this.videoService.getVideo(this.videoId).subscribe(
      (data: Video) => {
        this.video = data;
      },
      (error) => {
        console.error('Error loading video data', error);
      }
    );
  }
}
