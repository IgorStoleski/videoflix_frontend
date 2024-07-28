import { Component } from '@angular/core';
import { GalleryComponent } from "../gallery/gallery.component";

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [GalleryComponent],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.scss'
})
export class SportComponent {
  genre: string = 'Sport';
}
