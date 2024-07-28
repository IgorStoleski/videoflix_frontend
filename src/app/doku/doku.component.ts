import { Component } from '@angular/core';
import { GalleryComponent } from "../gallery/gallery.component";

@Component({
  selector: 'app-doku',
  standalone: true,
  imports: [GalleryComponent],
  templateUrl: './doku.component.html',
  styleUrl: './doku.component.scss'
})
export class DokuComponent {
  genre: string = 'Doku';

}
