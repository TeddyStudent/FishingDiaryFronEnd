import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Trip } from '../_models/index';

@Injectable()
export class TripService {
    constructor(private http: HttpClient) { }

	//Get all trips for current user (idtili required as id)
    getAll(id: number) {
        return this.http.get<Trip[]>('http://localhost:3005/api/trip/' + id);
    }

	//Get trip by trip id, might not be needed
    getById(id: number) {
        return this.http.get('http://localhost:3005/api/trip/' + id);
    }

	//Create new trip, trip object must include idtili
    create(trip: Trip) {
        return this.http.post('http://localhost:3005/api/trip', trip);
    }

	//Update trip
    update(trip: Trip) {
        return this.http.put('http://localhost:3005/api/trip/' + trip.idreissu, trip);
    }

	//Delete trip
    delete(id: number) {
        return this.http.delete('http://localhost:3005/api/trip/' + id);
    }
}