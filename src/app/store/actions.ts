import { Action } from '@ngrx/store';
import { Photo } from '../interfaces/photo';

export enum ActionType {
    FETCH_PHOTOS = '[Photo] Fetch Photos',
    PHOTOS_FAILED = '[Photo] Photos Failed',
    PHOTOS_RECIEVED = '[Photo] Photos Recieved',
}

export class FetchPhotos implements Action {
    public readonly type = ActionType.FETCH_PHOTOS;

    constructor(public payload: { query: string }) { }
}

export class PhotosRecieved implements Action {
    public readonly type = ActionType.PHOTOS_RECIEVED;

    constructor(public payload: Photo[]) { }
}

export class PhotosFailed implements Action {
    public readonly type = ActionType.PHOTOS_FAILED;

    constructor(public payload: Error) { }
}

export type PhotoActions = FetchPhotos | PhotosFailed | PhotosRecieved;