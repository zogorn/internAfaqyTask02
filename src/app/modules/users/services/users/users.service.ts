import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  deleteUser(id: number) {
    return this.http.delete('https://jsonplaceholder.typicode.com/users/' + id);
  }

  addUser(userData: any) {
    return this.http.post(
      'https://jsonplaceholder.typicode.com/users',
      userData
    );
  }

  getUserDetails(id: number) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + id);
  }

  updateUserDetails(id: number, userData: any) {
    return this.http.patch(
      'https://jsonplaceholder.typicode.com/users/' + id,
      userData
    );
  }
}
