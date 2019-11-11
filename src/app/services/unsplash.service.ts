import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Photo } from '../interfaces/photo';
import { Domain, accessKey } from '../domain/api';
import { tap, catchError } from 'rxjs/operators';

@Injectable(
    {
        providedIn: 'root'
    }
)
export class UnsplashService {
    constructor(private http: HttpClient) {
    }

    fetchPhotos = (query: string = ''): Observable<Photo[]> => {
        const params = {
            query,
            client_id: accessKey,
            count: '30'
        };
        const url = `${Domain.BASE}${Domain.RANDOM}`;

        return this.http.get(url, { params })
            .pipe(
                tap((photos: Photo[]) => {
                    console.log('Fetched photos %o with query %s', photos, query);
                }),

                catchError((error) => {
                    console.log('Photos fetched with error: %o', error);

                    return throwError(error);
                })
            );
    };
}