import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import {TypePartnerSlide} from "../../../../types";
import KeenSlider, {KeenSliderInstance} from "keen-slider";

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {
  @Input() data: TypePartnerSlide [] = [];
  @ViewChild("sliderRef") sliderRef?: ElementRef<HTMLElement>;
  slider?: KeenSliderInstance;
  currentSlideIndex: number = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // this.setCountSlides();
  }

  getSpacingValue () {
    const innerWidth = window.innerWidth;

    if (innerWidth < 580) {
      return 40;
    }
    if (innerWidth < 767) {
      return 60;
    }
    if (innerWidth < 991) {
      return 60;
    }

    return 90;
  }

  getAnimationDuration() {
    const innerWidth = window.innerWidth;

    if (innerWidth > 320 && innerWidth < 1440) {
     return  window.innerWidth * 28
    }

    return 24000;
  }

  getCountSlides() {
    const innerWidth = window.innerWidth;

    if (innerWidth < 580) {
      return 3;
    }
    if (innerWidth < 767) {
      return 4;
    }
    if (innerWidth < 991) {
      return 5;
    }

    return 6;
  }

  setIndex(index: number) {
    this.currentSlideIndex = index;
    this.slider?.moveToIdx(index)
  }

  ngAfterViewInit() {

    setTimeout(() => {
      if (!this.sliderRef) {
        return;
      }

      const countShowedSlides = this.getCountSlides();
      const spacingValue = this.getSpacingValue();
      const animationDuration = this.getAnimationDuration();

      const animation = {duration: animationDuration, easing: (t: any) => t}

      this.slider = new KeenSlider(this.sliderRef.nativeElement,
        {
          drag: false,
          initial: 0,
          loop: true,
          renderMode: "performance",
          mode: "free",
          slides: {
            perView: countShowedSlides,
            spacing: spacingValue,
          },
          created(s) {
            s.moveToIdx(countShowedSlides, true, animation)
          },
          updated(s) {
            s.moveToIdx(s.track.details.abs + countShowedSlides, true, animation)
          },
          animationEnded(s) {
            s.moveToIdx(s.track.details.abs + countShowedSlides, true, animation)
          }
        }
      )
    })
  }
}
