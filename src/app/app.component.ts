import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {PhotoState} from './store/state';
import {Observable} from 'rxjs';
import {Photo} from './interfaces/photo';
import {selectPhotos} from './store/selectors';
import {ClearPhotos, FetchPhotos, PushQuery} from './store/actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkVirtualScrollViewport} from '@angular/cdk/scrolling';
import {tap} from "rxjs/operators";

@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  }
)

export class AppComponent implements OnInit {
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  photosLength: number;

  photos$: Observable<Photo[]> = this.store.select(selectPhotos).pipe(tap((photos) => {
    this.photosLength = photos.length;
  }));

  formGroup: FormGroup = new FormGroup(
    {
      query: new FormControl('', Validators.required),
    }
  );

  constructor(private store: Store<PhotoState>) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchPhotos());

    this.viewport.elementScrolled().subscribe(() => {
      if (this.viewport.measureScrollOffset('bottom') > 900
        && this.viewport.measureScrollOffset('bottom') < 1000) {
        this.store.dispatch(new FetchPhotos());
      }
    });
  }

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
