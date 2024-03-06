// login.component.ts

import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ MatButtonModule,ReactiveFormsModule,FormsModule,
    MatInputModule,
    MatFormFieldModule,CommonModule,FormsModule,HttpClientModule, ],
  templateUrl: './login.component.html',
  providers:[AuthService],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;
  errorMessage!: string;
  constructor(private router: Router,private authService: AuthService) { }

  submitLogin() {
    this.authService.login(this.email, this.password)
      .subscribe(
        response => {
          // Successful login
          localStorage.setItem('token', response.token); // Store token in local storage
          this.router.navigate(['/app-home']);
        },
        error => {
          // Failed login
          this.errorMessage = error.error.message;
        }
      );
  }

  goToSignUp() {
    // Implement navigation logic to the signup page here
    console.log('Navigate to sign up page');
    this.router.navigate(['/app-signup']);
  }
}
//   errorMessage: string = ''; // Variable to store error message
//   constructor(private authService: AuthService, private router: Router) {}
 
//   onSubmit(loginForm: NgForm) {
//     if (loginForm.valid) {
//       const { email, password } = loginForm.value;
//       this.authService.login({ email, password }).subscribe(
//         (response) => {
//           console.log(response);
//           // Handle success
//           this.authService.setToken(response.token); // Store JWT token in local storage
//           this.router.navigate(['app-header']); // Redirect to dashboard after successful login
//         },
//         (error) => {
//           console.log(error);
//           // Handle error
//           this.errorMessage = 'Invalid email or password'; // Set error message
//         }
//       );
//     } else {
//       // Handle form validation errors
//       this.errorMessage = 'Please enter valid email and password'; // Set error message
//     }
//   }
// }
