import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/services/user.service';
import { Result } from '../interface/result.interface';
import { User } from '../interface/user.interface';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    users: User[];
    emailAlreadyExist = false;
    usernameAlreadyExist = false;

    constructor(private userService: UserService, private fb: FormBuilder, private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.initForm();
        this.userService.getUsers().subscribe((data: User[]) => {
            this.setUsers(data);
        });
    }


    public setUsers(data: User[]) {
        this.users = data;
    }

    initForm() {
        console.log("initForm")
        this.form = this.fb.group({
            firstName: new FormControl("", [Validators.required]),
            lastName: new FormControl("", [Validators.required]),
            username: new FormControl("", [Validators.required]),
            mail: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required]),
        });
    }

    register() {
        for (const element of this.users) {
            if (this.form.get('mail')?.value === element.mail) {
            }
            if (this.form.get('username')?.value === element.username) {
                this.usernameAlreadyExist = true;
            }
        }

        if (this.form.valid && !this.emailAlreadyExist && !this.usernameAlreadyExist) {
            console.log('valide');
            this.authService.register(
                this.form.get('firstName')?.value,
                this.form.get('lastName')?.value,
                this.form.get('username')?.value,
                this.form.get('mail')?.value,
                this.form.get('password')?.value
            ).subscribe((result: Result) => {
                if (result.success) {
                    alert(result.message);

                    this.emailAlreadyExist = false;
                    this.usernameAlreadyExist = false;
                    this.router.navigateByUrl('/login');

                }
                else {

                    alert(result.message);

                    this.emailAlreadyExist = false;
                    this.usernameAlreadyExist = false;
                }
            })
        }
        else if (this.emailAlreadyExist) {
            alert("Email déjà utilisé");
        }
        else if (this.usernameAlreadyExist) {
            alert("Username déjà utilisé");
        }
        else {
            alert("Veuillez remplir les champs obligatoires");
        }
    }
}