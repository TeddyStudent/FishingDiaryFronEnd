import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        return this.http.post('http://localhost:3005/api/user', user);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.idtili, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}