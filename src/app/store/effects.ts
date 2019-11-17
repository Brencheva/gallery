import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { PhotoState } from './state';
import { ActionType, FetchPhotos, PhotosFailed, PhotosRecieved, } from './actions';
import { catchError, debounceTime, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Photo } from '../interfaces/photo';
import { UnsplashService } from '../services/unsplash.service';
import { selectQuery } from "./selectors";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PhotoEffects {
  constructor(private actions$: Actions, private store: Store<PhotoState>, private unsplashService: UnsplashService) {
  }

  @Effect()
  fetchPhotos$ = this.actions$.pipe(
    ofType<FetchPhotos>(ActionType.FETCH_PHOTOS),

    mergeMap(() => {
      return this.store.pipe(select(selectQuery));
    }),

    mergeMap((query: string) => {
      return this.unsplashService.fetchPhotos(query)
        .pipe(
          map((photos: Photo[]) => {
            const actionPayload = {
              photos: photos.sort(this.sortByDate)
            };

            return new PhotosRecieved(actionPayload);
          }),

          catchError((error: Error) => {
            const actionPayload = error;

            return of(new PhotosFailed(actionPayload));
          })
        )
    }
    )
  );

  @Effect()
  photosFailed$ = this.actions$.pipe(
    ofType<PhotosFailed>(ActionType.PHOTOS_FAILED),

    mergeMap((action) => {
      alert(`Something goes wrong. Error: ${action.payload.message}`);

      return of();
    })
  );

  sortByDate(itemA: Photo, itemB: Photo): number {
    const dateA = new Date(itemA.updated_at);
    const dateB = new Date(itemB.updated_at);

    return dateA < dateB ? 1 : -1;
  }
}
