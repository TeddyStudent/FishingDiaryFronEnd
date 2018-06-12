import { Component, OnInit } from '@angular/core';

import { User,Trip,Catch } from '../_models/index';
import { UserService, TripService, CatchService, AlertService } from '../_services/index';

import {MatTable, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    //users: User[] = [];
    trips: Trip[] = [];
    catches: Catch[] = [];
    selectedTrip: number;
    newTrip: any = {};

    public saat = [
        { value: 'pilvinen', display: 'pilvinen' },
        { value: 'puolipilvinen', display: 'puolipilvinen' },
        { value: 'selkeä', display: 'selkeä' },
        { value: 'sadekuuroja', display: 'sadekuuroja' },
        { value: 'kovaa sadetta', display: 'kovaa sadetta' },
        { value: 'ukkosta', display: 'ukkosta' }
    ];

    public suunnat = [
        { value: 'pohjoinen', display: 'pohjoinen' },
        { value: 'koillinen', display: 'koillinen' },
        { value: 'itä', display: 'itä' },
        { value: 'kaakko', display: 'kaakko' },
        { value: 'etelä', display: 'etelä' },
        { value: 'lounas', display: 'lounas' },
        { value: 'länsi', display: 'länsi' },
        { value: 'luode', display: 'luode' }
    ];

    constructor(private userService: UserService, 
        private tripService: TripService, 
        private catchService: CatchService,
        private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        //this.loadAllUsers();
        this.loadAllTrips();
        this.loadAllCatches();
    }

    /*
    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }
    */

    private loadAllTrips() {
        this.tripService.getAll(this.currentUser[0].idtili).subscribe(trips => { this.trips = trips; });
    }

    createTrip() {
        this.tripService.create(this.newTrip)
            .subscribe(
                data => {
                    this.alertService.success('Luonti onnistui', true);
                    // päivitä trip table
                    this.loadAllTrips();
                },
                error => {
                    this.alertService.error(error);     
                });
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

    setSelectedtrip(id: number) {
        this.selectedTrip = id;
        console.log('selected trip (id) is: ' + this.selectedTrip);
    }


}