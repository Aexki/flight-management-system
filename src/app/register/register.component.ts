import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    public addUserForm!: FormGroup;
    constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

    ngOnInit(): void {
        this.addUserForm = this.formBuilder.group({
            'firstName': ['', Validators.required],
            'lastName': ['', Validators.required],
            'username': ['', Validators.required],
            'mobile': ['', Validators.required],
            'password': ['', Validators.required],
            'emailId': ['', Validators.required]
        })
    }

    addUser() {
        this.userService.addUser(this.addUserForm.value).subscribe(
            (response: any) => {
                this.router.navigate(['login']);
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
