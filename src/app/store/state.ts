import { Photo } from '../interfaces/photo';

export interface PhotoState {
    error: Error;
    photos: Photo[];
}