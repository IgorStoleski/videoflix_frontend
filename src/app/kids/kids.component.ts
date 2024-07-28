import { Component } from '@angular/core';
import { GalleryComponent } from "../gallery/gallery.component";

@Component({
  selector: 'app-kids',
  standalone: true,
  imports: [GalleryComponent],
  templateUrl: './kids.component.html',
  styleUrl: './kids.component.scss'
})
export class KidsComponent {
  genre: string = 'Kids';
}
