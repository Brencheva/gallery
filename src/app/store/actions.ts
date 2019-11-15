import {Action} from '@ngrx/store';
import {Photo} from '../interfaces/photo';

export enum ActionType {
  FETCH_PHOTOS = '[Photo] Fetch Photos',
  CLEAR_PHOTOS = ' [Photo] Clear Photos',
  PHOTOS_FAILED = '[Photo] Photos Failed',
  PHOTOS_RECIEVED = '[Photo] Photos Recieved',
  PUSH_QUERY = '[Query] Push Query'
}

export class FetchPhotos implements Action {
  public readonly type = ActionType.FETCH_PHOTOS;

  constructor() {
  }
}

export class PhotosRecieved implements Action {
  public readonly type = ActionType.PHOTOS_RECIEVED;

  constructor(public payload: { photos: Photo[] }) {
  }
}

export class PhotosFailed implements Action {
  public readonly type = ActionType.PHOTOS_FAILED;

  constructor(public payload: Error) {
  }
}

export class PushQuery implements Action {
  public readonly type = ActionType.PUSH_QUERY;

  constructor(public payload: { query: string }) {
  }
}

export class ClearPhotos implements Action {
  public readonly type = ActionType.CLEAR_PHOTOS;

  constructor() {

  }
}

export type PhotoActions = FetchPhotos | PhotosFailed | PhotosRecieved | PushQuery | ClearPhotos;
