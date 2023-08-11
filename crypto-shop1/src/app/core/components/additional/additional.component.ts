import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {additionalCards, image1} from "../../../../static";
import {TypeAdditionalCard} from "../../../../types";
import KeenSlider, {KeenSliderInstance} from "keen-slider";

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})
export class AdditionalComponent {
  image1 = image1;
  @Input () data: TypeAdditionalCard [] = [];
  @ViewChild("sliderRef") sliderRef?: ElementRef<HTMLElement>
  slider?: KeenSliderInstance;
  currentSlideIndex: number = 0;
  paginationHelper: number [] = [];

  ngAfterViewInit () {
    setTimeout(() => {
      if (!this.sliderRef) {
        return;
      }

      this.paginationHelper = [...Array(this.data.length).keys()].reverse();

      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlideIndex,
        slides: {
          perView: 1,
          spacing: 0,
        },
        created: () => {
        },
        slideChanged: (s) => {
          this.currentSlideIndex = s.track.details.rel
        },
      })
    })

  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }
}
