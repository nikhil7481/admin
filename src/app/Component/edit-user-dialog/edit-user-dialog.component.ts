import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { User } from '../Models/user.model';
import { AuthService } from '../Services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [ReactiveFormsModule,HttpClientModule],
  providers:[AuthService],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css'
})
export class EditUserDialogComponent implements OnInit {

  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      id: [data.user.id, Validators.required],
      fullname: [data.user.fullname, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      password: [data.user.password, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const updatedUser: User = {
        id: this.userForm.value.id,
        fullname: this.userForm.value.fullname,
        email: this.userForm.value.email,
        password: this.userForm.value.password
      };

      this.authService.updateUser(updatedUser).subscribe(
        (response) => {
          this.dialogRef.close(response);
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}