import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MapDirectionsRenderer } from "@angular/google-maps";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MapService {
    googlemapApiKey = environment.googleMapApi;

    constructor(
        private http: HttpClient
    ) { }
    private _apiLoaded = false;
    private _isApiLoading = false;

    loadApi(): BehaviorSubject<boolean> {
        const subject$ = new BehaviorSubject<boolean>(false);
        if (this._apiLoaded) {
            subject$.next(true);
        } else if (!this._isApiLoading) {
            this._isApiLoading = true;
            this.http.jsonp(`https://maps.googleapis.com/maps/api/js?key=${this.googlemapApiKey}`, 'callback')
                .pipe(
            ).subscribe(r => {
                this._apiLoaded = true;
                subject$.next(true);
            })
        }
        return subject$;
    }
}