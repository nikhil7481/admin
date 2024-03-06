import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ MatButtonModule,
    MatInputModule,
    MatFormFieldModule,CommonModule,FormsModule,HttpClientModule,ReactiveFormsModule ],
  templateUrl: './signup.component.html',
  providers:[AuthService],
  styleUrl: './signup.component.css'
})
export class SignupComponent{
  fullname!: string;
  email!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router: Router,private authService: AuthService) { }

  submitSignup() {
    this.authService.signUp(this.fullname, this.email, this.password)
      .subscribe(
        response => {
          // Successful signup
          // Optionally, you can redirect to the login page or display a success message
          console.log('Signup successful:', response.message);
          this.router.navigate(['/app-login']); // Redirect to login page
        },
        error => {
          // Failed signup
          this.errorMessage = error.error.message;
          console.error('Signup failed:', error);
        }
      );
  }
  

  goToLogin() {
    this.router.navigate(['/app-login']);
  }
}
//   constructor(private authService: AuthService) {}

//   onSubmit(signUpForm: NgForm) {
//     if (signUpForm.valid && signUpForm.value.password === signUpForm.value.confirmPassword) {
//       const { fullname, email, password } = signUpForm.value; // Destructure form value
//       this.authService.signUp({ fullname, email, password }).subscribe(
//         (response) => {
//           console.log(response);
//           // Handle success
//           // For example, redirect to a dashboard page or display a success message
//         },
//         (error) => {
//           console.log(error);
//           // Handle error
        
//         }
//       );
//     } else {
//       // Handle form validation errors
//       if (!signUpForm.valid) {
//         // Form is not valid, display validation error messages
//         Object.keys(signUpForm.controls).forEach(field => {
//           const control = signUpForm.controls[field];
//           control.markAsTouched({ onlySelf: true });
//         });
//       }
//       if (signUpForm.value.password !== signUpForm.value.confirmPassword) {
//         // Passwords do not match, display custom error message
//         signUpForm.controls['confirmPassword'].setErrors({ 'passwordMismatch': true });
//       }
//     }
//   }
// }