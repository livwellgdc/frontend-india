import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'lv-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss']
})
export class LazyImageComponent implements OnInit {
  colors = ['#70929c,#846170', '#846170,#70929c', '#e6846e,#70929c', '#8e8485,#70929c', '#846170,#e6846e', '#70929c,#e6846e', '#70929c,#8e8485', '#8e8485,#e6846e', '#e6846e,#846170']
  @ViewChild('image', { static: true }) image: ElementRef;
  @Input() img: string;
  @Input() default: number = 1;
  defaultImg: string;
  constructor() { }

  ngOnInit() {
    // this.setBackgroundColor();
    this.defaultImageSet();
  }

  defaultImageSet() {
    switch (this.default) {
      case 1:
        this.defaultImg = './assets/images/image_uploader.png'
        break;
      case 2:
        this.defaultImg = './assets/images/u_placeholder.jpg'
        break;
      case 3:
        this.defaultImg = './assets/images/logo.jpg'
        break;
      default:
        break;
    }
  }

  setBackgroundColor() {
    const color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.image.nativeElement.style.backgroundImage = `linear-gradient(135deg,${color})`;
  }
}
