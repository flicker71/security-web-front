import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/auth/auth.service';
import { Result } from '../interface/result.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    form: FormGroup;

    constructor(private authService: AuthService, private fb: FormBuilder, 
        private router: Router) {}

    ngOnInit() {
        this.initForm()
    }

    initForm(){
        console.log("initForm")
        this.form = this.fb.group({
            mail: new FormControl("", [Validators.required]), 
            password: new FormControl("", [Validators.required])
        });
    }

    loginProcess(){
        console.log('loginProcess()')
        if(this.form.valid){
            console.log('valide')
            this.authService.login(this.form.value).subscribe((result:Result) =>{
                if(result.success){
                    localStorage.setItem('jwt', result.token)
                    alert(result.message);
                    this.router.navigateByUrl('/home');
                }
                else {

                    alert(result.message);
                }
            })
        }
    }
}