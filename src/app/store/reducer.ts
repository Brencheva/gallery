import { PhotoState } from './state';
import { ActionType, PhotoActions, FetchPhotos } from './actions';

export const initialState: PhotoState = {
    error: null,
    photos: []
};

export const photoReducer = (state = initialState, action: PhotoActions): PhotoState => {
    switch (action.type) {
        case ActionType.PHOTOS_RECIEVED:
            return {
                ...state,
                photos: action.payload
            };
        case ActionType.PHOTOS_FAILED:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    }
}