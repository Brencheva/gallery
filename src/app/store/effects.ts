import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { PhotoState } from './state';
import { FetchPhotos, ActionType, PhotosRecieved, PhotosFailed, } from './actions';
import { mergeMap, map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Photo } from '../interfaces/photo'; import { UnsplashService } from '../services/unsplash.service';

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

        mergeMap((action) => {
            const { query } = action.payload;

            return this.unsplashService.fetchPhotos(query)
                .pipe(
                    map((photos: Photo[]) => {
                        const actionPayload = photos.sort(sortByDate);
                        actionPayload.forEach(a => console.log(a.updated_at));

                        function sortByDate(itemA: Photo, itemB: Photo): number {
                            const dateA = new Date(itemA.updated_at);
                            const dateB = new Date(itemB.updated_at);

                            return dateA > dateB ? 1 : -1;
                        }

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

        tap((action) => {
            debugger;
            alert(`Something goes wrong. Error: ${action.payload.message}`);
        })
    )
}