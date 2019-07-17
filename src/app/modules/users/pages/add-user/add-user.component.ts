import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  userId;
  constructor(
    private fb: FormBuilder,
    private userSer: UsersService,
    private route: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();
    this.userId = this.router.snapshot.params.id;
    this.getUserData();
  }

  onSubmit() {
    if (this.isEdit()) {
      this.userSer
        .updateUserDetails(this.userId, this.userForm.value)
        .subscribe(resp => {
          this.route.navigate(['/users']);
        });
    } else {
      this.userSer.addUser(this.userForm.value).subscribe(resp => {
        this.route.navigate(['/users']);
      });
    }
  }

  getUserData() {
    if (this.isEdit()) {
      this.userSer
        .getUserDetails(this.userId)
        .pipe(take(1))
        .subscribe(resp => {
          this.userForm.patchValue(resp);
        });
    }
  }

  isEdit() {
    return !!this.userId;
  }

  buildForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]]
    });
  }
}
