import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatTableModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import { AllUsersComponent } from './pages/all-users/all-users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    children: [
      { path: 'all', component: AllUsersComponent },
      { path: '', redirectTo: 'all', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [UsersComponent, AllUsersComponent]
})
export class UsersModule {}
