import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Video {
  id: number;
  title: string;
  description: string;
  thumbnails: string;
  video_360p_m3u8: string;
  video_720p_m3u8: string;
  video_1080p_m3u8: string;
  video_master_m3u8: string;
  video_file: string;
  genre: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  /* private apiUrl = 'http://10.10.0.102:8000/videos/';  */
  private apiUrl = 'https://backend.video-flix.de/videos/'; 

  constructor(private http: HttpClient) { }

  getVideo(id: number): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}${id}/`);
  }

  getVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

  getVideosByGenre(genre: string): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}genre/${genre}/`);
  }
}
