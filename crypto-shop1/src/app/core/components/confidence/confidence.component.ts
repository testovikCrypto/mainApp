import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
import KeenSlider, {KeenSliderInstance} from "keen-slider";
import {TypeConfidenceCard} from "../../../../types";

const COUNT_SLIDES_BREAK = 991;
@Component({
  selector: 'app-confidence',
  templateUrl: './confidence.component.html',
  styleUrls: ['./confidence.component.scss']
})
export class ConfidenceComponent {

  @Input () data: TypeConfidenceCard [] = [];
  @ViewChild("sliderRef") sliderRef?: ElementRef<HTMLElement>;
  slider?: KeenSliderInstance;
  currentSlideIndex: number = 0;
  countShowedSlides: number = 1;
  paginationHelper: number [] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setCountSlides();
  }

  setCountSlides () {
    const innerWidth = window.innerWidth;
    if (innerWidth < COUNT_SLIDES_BREAK) {
      this.countShowedSlides = 1;
    } else {
      this.countShowedSlides = 2;
    }
  }

  setCountPaginationDots () {
    let countPaginationDots =  0;
    const countSlides =  this.slider?.track.details.slides.length || 0;

    if (this.countShowedSlides === 1) {
      countPaginationDots = countSlides;
    } else {
      countPaginationDots = countSlides - 1;
    }

    this.paginationHelper = [
      ...Array(countPaginationDots).keys(),
    ]
  }

  setIndex  (index: number) {
    this.currentSlideIndex = index;
    this.slider?.moveToIdx(index)
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.sliderRef) {
        return;
      }

      this.setCountSlides();
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlideIndex,
        slides: {
          perView: this.countShowedSlides,
          spacing: 0,
        },
        created: () => {
          // this.setCountPaginationDots();
        },
        slideChanged: (s) => {
          this.currentSlideIndex = s.track.details.rel
        },
      })

      this.setCountPaginationDots();
    })

  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
