import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Catch } from '../_models/index';

@Injectable()
export class CatchService {
    constructor(private http: HttpClient) { }

	// Get all catches for current user (idtili required as id)
    getAll(id: number) {
        return this.http.get<Catch[]>('http://localhost:3005/api/catch/' + id);
    }

	// Get catches by trip id, implement if needed

	// Create new catch, catch object must include user and trip id
    create(_catch: Catch) {
        return this.http.post('http://localhost:3005/api/catch', _catch);
    }

	// Update catch
    update(_catch: Catch) {
        return this.http.put('http://localhost:3005/api/catch/' + _catch.idkalat, _catch);
    }

	// Delete catch
    delete(id: number) {
        return this.http.delete('http://localhost:3005/api/catch/' + id);
    }
}