import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UsersService } from '../../services/users/users.service';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
];

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  constructor(
    private usersSer: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.usersSer
      .getAllUsers()
      .pipe(take(1))
      .subscribe((resp: any) => ((this.dataSource = resp), console.log(resp)));
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: any): void {
    this.router.navigate(['../edit/' + id], { relativeTo: this.route });
  }

  delete(id: any): void {
    if (confirm('Are You Sure!!!')) {
      this.usersSer
        .deleteUser(id)
        .pipe(take(1))
        .subscribe(resp => {
          this.getUsers();
        });
    }
  }
}
