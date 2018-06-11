import { Component, OnInit } from '@angular/core';

import { User,Trip,Catch } from '../_models/index';
import { UserService, TripService, CatchService } from '../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];
    trips: Trip[] = [];
    catches: Catch[] = [];

    constructor(private userService: UserService, private tripService: TripService, private catchService: CatchService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllUsers();
        this.loadAllTrips();
        this.loadAllCatches();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    private loadAllTrips() {
        this.tripService.getAll(this.currentUser[0].idtili).subscribe(trips => { this.trips = trips; });
    }

    deleteTrip(id: number) {
        this.tripService.delete(id).subscribe(() => { this.loadAllTrips() });
    }

    private loadAllCatches() {
        this.catchService.getAll(this.currentUser[0].idtili).subscribe(catches => { this.catches = catches; });
    }

    deleteCatch(id: number) {
        this.catchService.delete(id).subscribe(() => { this.loadAllCatches() });
    }



}