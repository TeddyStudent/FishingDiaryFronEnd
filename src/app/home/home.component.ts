﻿import { Component, OnInit, ViewChild } from '@angular/core';

import { User,Trip,Catch } from '../_models/index';
import { UserService, TripService, CatchService, AlertService } from '../_services/index';

import {MatTable, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {NgForm} from '@angular/forms';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    //users: User[] = [];
    trips: Trip[] = [];
    catches: Catch[] = [];
    selectedTrip: Trip;
    selectedTripId: number | undefined;
    selectedTripRow: number | undefined;
    selectedCatch: Catch;
    selectedCatchId: number;
    selectedCatchRow: number;
    newTrip: any = {};
    @ViewChild('f') form;
    tripAction = 'create';
    tripFormHeaderTxt = '';
    tripFormSubmitTxt = '';

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
        this.setTripFormTxt();
    }

    setTripFormTxt() {
        if (this.tripAction == 'modify') {
            this.tripFormHeaderTxt = 'Muokkaa reissua';
            this.tripFormSubmitTxt = 'Muokkaa';
        } else {
            this.tripFormHeaderTxt = 'Luo uusi reissu';
            this.tripFormSubmitTxt = 'Luo';
        }
    }

    private loadAllTrips() {
        this.tripService.getAll(this.currentUser[0].idtili).subscribe(trips => { this.trips = trips; });
    }

    createTrip(f: NgForm) {
        // set idtili from currentUser to newTrip.idtili before the create operation
        this.newTrip.tili_idtili = this.currentUser[0].idtili;

        if (this.tripAction == 'modify') {
            // form submit to modify a trip
            console.log('modify trip submit');

            //functionality to send the changed trip to backend

            //finally set tripAction and set form texts, clear form and hide it 
            this.tripAction = 'create';
            this.setTripFormTxt();
            f.resetForm();
            this.showhideNewTripElement('hide');
        } else {
            // form submit for creating a new trip
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
            f.resetForm();
            this.showhideNewTripElement('hide');
        }
        
    }

    deleteTrip(id: number) {
        //if deleted trip was also the selected row then set selectedTripId and row to undefined
        if (this.selectedTripId == id) {
            this.selectedTripId = undefined;
            this.selectedTripRow = undefined;
        }
        this.tripService.delete(id)
            .subscribe(
                () => {
                    this.alertService.success('Poisto onnistui', true); 
                    this.loadAllTrips(); 
                },
                error => {
                    this.alertService.error(error);
                });
    }

    private loadAllCatches() {
        this.catchService.getAll(this.currentUser[0].idtili).subscribe(catches => { this.catches = catches; });
    }

    deleteCatch(id: number) {
        this.catchService.delete(id)
            .subscribe(
                () => { 
                    this.loadAllCatches() 
                },
                error => {
                    this.alertService.error(error);
                });
    }

    modifyTrip(index,chosen: Trip) {
        console.log('modify trip selected');
        //Note: setSelectedTrip was also called when 'muokkaa' was selected
        //set tripAction to modify so it can be checked in form submit procedure
        this.tripAction = 'modify';
        //set form texts suitable for modfication
        this.setTripFormTxt();
        //prefill form fields with selected trip data
        this.form.setValue({
            pvm: chosen.pvm,
            paikka: chosen.paikka,
            saa: chosen.saa,
            t_nopeus: chosen.t_nopeus,
            t_suunta: chosen.t_suunta,
            l_ilma: chosen.l_ilma,
            l_vesi: chosen.l_vesi
        })
        //show modify form
        this.showhideNewTripElement('show');
    }

    setSelectedtrip(index,chosen: Trip) {
        this.selectedTrip = chosen;
        this.selectedTripId = chosen.idreissu;
        console.log('this.selectedTrip.idreissu is: ' + this.selectedTrip.idreissu);
        console.log('this.selectedTripId is: ' + this.selectedTripId);
        this.selectedTripRow = index;
    }

    setSelectedCatch(index,chosen: Catch) {
        this.selectedCatch = chosen;
        this.selectedCatchId = chosen.idkalat;
        console.log('this.selectedCatch.idkalat is: ' + this.selectedCatch.idkalat);
        console.log('this.selectedCatchId is: ' + this.selectedCatchId);
        this.selectedCatchRow = index;
    }

    showhideNewTripElement(action) {
        if (action == "show") {
            document.getElementById("newTrip").style.display = "block";
        } else {
            if (this.tripAction == 'modify') {
                //finally set tripAction and set form texts, clear form and hide it 
                this.tripAction = 'create';
                this.setTripFormTxt();
                this.form.resetForm();
            }
            document.getElementById("newTrip").style.display = "none";
        }    
    }

    showhideNewCatchElement(action) {
        if (action == "show") {
            document.getElementById("newCatch").style.display = "block";
        } else {
            document.getElementById("newCatch").style.display = "none";
        }    
    }

}