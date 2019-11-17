import { ChangeDetectionStrategy, Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { PhotoState } from './store/state';
import { Observable } from 'rxjs';
import { Photo } from './interfaces/photo';
import { selectPhotos } from './store/selectors';
import { ClearPhotos, FetchPhotos, PushQuery } from './store/actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)

export class AppComponent implements OnInit, AfterViewChecked {
  readonly footerHeight = 85;

  photos$: Observable<Photo[]> = this.store.select(selectPhotos);

  formGroup: FormGroup = new FormGroup(
    {
      query: new FormControl('', Validators.required),
    }
  );

  constructor(private store: Store<PhotoState>) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchPhotos());
  }

  ngAfterViewChecked() {
    this.downloadPhotos();
  }

  addFetchingAndDownloadingPhotos = (container): void => {
    if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
      this.store.dispatch(new FetchPhotos());
    }

    this.downloadPhotos();
  };

  downloadPhotos = (): void => {
    const containerHeight = document.body.clientHeight - this.footerHeight;

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

  pushQuery = (): void => {
    if (!this.formGroup.controls.query.value) {
      return;
    }

    this.store.dispatch(new ClearPhotos());

    const actionPayload = {
      query: this.formGroup.controls.query.value
    };
    this.store.dispatch(new PushQuery(actionPayload));
  };
}
