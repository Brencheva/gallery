import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PhotoState } from './store/state';
import { Observable } from 'rxjs';
import { Photo } from './interfaces/photo';
import { selectPhotos } from './store/selectors';
import { FetchPhotos } from './store/actions';
import { FormControl, FormGroup } from '@angular/forms';


@Component(
  {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
  }
)

export class AppComponent implements OnInit {
  photos$: Observable<Photo[]> = this.store.pipe(select(selectPhotos));

  formGroup: FormGroup = new FormGroup(
    {
      query: new FormControl(''),
    }
  );

  constructor(private store: Store<PhotoState>) {
  }

  ngOnInit() {
    this.fetchPhotos();
  }

  fetchPhotos = (): void => {
    const actionPayload = {
      query: this.formGroup.controls.query.value
    };

    this.store.dispatch(new FetchPhotos(actionPayload));
  };
}