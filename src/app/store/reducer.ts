import { PhotoState } from './state';
import { ActionType, PhotoActions } from './actions';
import { query } from '@angular/animations';

export const initialState: PhotoState = {
  error: null,
  photos: [],
  query: ''
};

export const photoReducer = (state = initialState, action: PhotoActions): PhotoState => {
  switch (action.type) {
    case ActionType.CLEAR_PHOTOS:
      return {
        ...state,
        photos: []
      };
    case ActionType.PHOTOS_RECIEVED:
      return {
        ...state,
        photos: [
          ...state.photos,
          ...action.payload.photos
        ]
      };
    case ActionType.PHOTOS_FAILED:
      return {
        ...state,
        error: action.payload
      };
    case ActionType.PUSH_QUERY:
      if (state.query !== action.payload.query) {
        return {
          ...state,
          query: action.payload.query
        };
      }

    default:
      return state;
  }
};
