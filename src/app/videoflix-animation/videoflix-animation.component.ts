import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate, query, stagger, state } from '@angular/animations';


@Component({
  selector: 'app-videoflix-animation',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule],
  templateUrl: './videoflix-animation.component.html',
  styleUrl: './videoflix-animation.component.scss',
  animations: [
    trigger('letterAnimation', [
      state('enter', style({ opacity: 1, transform: 'scale(1)' })),
      state('leave', style({ opacity: 0, transform: 'scale(0)' })),
      transition('enter => leave', [
        query('.letter', [
          stagger(-600, [ 
            animate('0.5s ease-in', style({ opacity: 0, transform: 'scale(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('finalAnimation', [
      transition(':enter', [
        style({ transform: 'scale(1)', filter: 'blur(0px)', opacity: 1 }),
        animate('5.0s ease-in', style({ transform: 'scale(5)', filter: 'blur(20px)' }))
      ])
    ])

  ]
})
export class VideoflixAnimationComponent {
  letters = 'VIDEOFLIX'.split('');
  animationState = 'enter';
  finalAnimationState = false;

  constructor(public router: Router) {}

  ngOnInit() {
    console.log('ngOnInit called');
    setTimeout(() => {
      this.animationState = 'leave';
      console.log('Starting leave animation');
      setTimeout(() => {
        this.finalAnimationState = true;
        console.log('Starting final animation');
      }, 6000); 
    }, 1000);
  }

  onFinalAnimationDone() {
    console.log('Final animation done. Routing to login.');
    this.router.navigate(['/login']);
  }

}
