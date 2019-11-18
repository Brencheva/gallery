import {AfterViewChecked, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {PhotoState} from './store/state';
import {Observable} from 'rxjs';
import {Photo} from './interfaces/photo';
import {selectPhotos} from './store/selectors';
import {ClearPhotos, FetchPhotos, PushQuery} from './store/actions';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ScrollMonitorService} from "./services/scroll-monitor.service";

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

  constructor(private scrollMonitorService: ScrollMonitorService,
              private store: Store<PhotoState>) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchPhotos());
  }

  ngAfterViewChecked() {
    this.scrollMonitorService.downloadPhotos(document.body.clientHeight - this.footerHeight);
  }

  addTrackingAndDownloadingPhotos = (container): void => {
    this.scrollMonitorService.trackPhotos(container);

    this.scrollMonitorService.downloadPhotos(document.body.clientHeight - this.footerHeight);
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
