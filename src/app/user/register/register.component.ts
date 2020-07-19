import { Component, OnInit } from '@angular/core';
import { RegisterService } from "../../core/services/register.service";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UserService } from "../../user/services/user.service";
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showSpinner:boolean = false;
  isSubmitted = false;
  labelPosition: string;
  registerForm : FormGroup;
  passwordNotmatched = false;
  constructor(private registerService:RegisterService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void { 
    this.registerForm  =  this.formBuilder.group({
      userEmail: ['', Validators.required],
      userPassword: ['', Validators.required], //Validators.minLength(6)
      confirmPassword: ['', Validators.required],
      userName: ['', Validators.required],
      userAccountType: ['', Validators.required]
  });
  }

  get formControls() { 
    return this.registerForm.controls; 
  }
  
  onBlurPassword(){
    if(this.registerForm.value.userPassword !== this.registerForm.value.confirmPassword){
      this.passwordNotmatched = true;
    }else{
      this.passwordNotmatched = false;
    }
  }
  onSubmit() {
      this.isSubmitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) {
        return;
    }
      let data = this.registerForm.value;
      this.userService.register(data)
            .pipe(first())
            .subscribe(
                data => {
                  let snackBarRef = this.snackBar.open('User registration successful', 'close', {
                    duration: 3000
                  });
                    this.router.navigate(['/login']);
                },
                error => {
                  let snackBarRef = this.snackBar.open(error.error.errormessage, 'close', {
                    duration: 3000
                  });
                    // this.alertService.error(error);
                    // this.loading = false;
                });
  }
}
