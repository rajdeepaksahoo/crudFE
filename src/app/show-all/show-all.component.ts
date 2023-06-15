import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UserServiceService } from '../service/user-service.service';
import { User } from '../user';

@Component({
  selector: 'app-show-all',
  templateUrl: './show-all.component.html',
  styleUrls: ['./show-all.component.css']
})
export class ShowAllComponent {
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['id', 'name', 'place', 'actions'];

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private appService: UserServiceService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.appService.getAllUsers().subscribe(
      (data: User[]) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteUser(id?: number) {
    if (id) {
      this.appService.deleteUser(id).subscribe(
        (res) => {
          // Delete successful, perform any necessary actions
          this.loadUsers();
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.log('User ID is undefined');
    }
  } 
  editUser(id:number){
    
  }
}
