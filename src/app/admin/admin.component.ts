import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    public addUserForm!: FormGroup;
    public addFlightDetailsForm!: FormGroup;

    constructor(private router: Router,
        private formBuilder: FormBuilder,
        private userService: UserService,) { }

    ngOnInit(): void {
        this.addUserForm = this.formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'username': ['', Validators.required],
            'mobile': ['', Validators.required],
            'password': ['', Validators.required]
        })

        this.addFlightDetailsForm = this.formBuilder.group({
            'id': ['', Validators.required],
            'flightNumber': ['', Validators.required],
            'source': ['', Validators.required],
            'destination': ['', Validators.required],
            'date': ['', Validators.required],
            'fare': ['', Validators.required]
        })
    }

    addUser() {
        console.log(this.addUserForm);
        // this.userService.addUser(this.addUserForm.value).subscribe(
        //     (response: any) => {
        //         console.log(response);
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );
    }

    addFlight() {
        let body = this.addFlightDetailsForm.value;
        let date = new Date(body.date);
        body.date = date.getDate() + '-' + date.getUTCMonth() + '-' + date.getFullYear()

        this.userService.addFlight(body).subscribe(
            (response: any) => {
                this.addFlightDetailsForm.reset();
                console.log('-', response.error.text);
            },
            (error) => {
                this.addFlightDetailsForm.reset();
                console.log(error.error.text);
            }
        );
    }

}
