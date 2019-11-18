import {Injectable} from '@angular/core';
import {FetchPhotos} from "../store/actions";
import {Store} from "@ngrx/store";
import {PhotoState} from "../store/state";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ScrollMonitorService {
  constructor(private store: Store<PhotoState>) {
  }

  trackPhotos = (container): void => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      this.store.dispatch(new FetchPhotos());
    }
  };

  downloadPhotos = (containerHeight: number): void => {
    document.querySelectorAll('img').forEach((image) => {
      const src = image.dataset.src;

      if (!src) {
        return;
      }

      if (this.isVisible(image, containerHeight)) {
        image.src = src;
        image.dataset.src = '';
      }
    })
  };

  isVisible = (image, containerHeight): boolean => {
    const coordinates = image.getBoundingClientRect();
    const topIsVisible = coordinates.top > 0 && coordinates.top < containerHeight;
    const bottomIsVisible = coordinates.bottom > 0 && coordinates.bottom < containerHeight;

    return topIsVisible || bottomIsVisible;
  };
}
