import { PhotoState } from './state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const selectPhotoState = createFeatureSelector<PhotoState>('photo');

export const selectPhotos = createSelector(selectPhotoState, (state: PhotoState) => state.photos);

export const selectQuery = createSelector(selectPhotoState, (state: PhotoState) => state.query);
