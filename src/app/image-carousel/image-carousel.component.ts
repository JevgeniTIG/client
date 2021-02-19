// import {Component, Input, ViewChild} from '@angular/core';
//
//
// @Component({
//   selector: 'app-image-carousel',
//   templateUrl: './image-carousel.component.html',
//   styleUrls: ['./image-carousel.component.css'],
// })
//
// export class ImageCarouselComponent {
//   @Input() post;
//
//   @ViewChild('carousel', {static: false}) carousel: any;
//
//
//   next(): void {
//     this.carousel.nextSlide();
//   }
//   prev(): void {
//     this.carousel.previousSlide();
//   }
//
//   formatImage(img: any): any {
//     if (img == null) {
//       return null;
//     }
//     return 'data:image/jpeg;base64,' + img;
//   }
//
// }
