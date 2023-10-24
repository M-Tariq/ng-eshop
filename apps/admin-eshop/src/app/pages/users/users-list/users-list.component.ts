import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from '@inspirelogix/users';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  users: User[] = [];
  constructor(private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {
    this._getUsers();
  }

  private _getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
  navigateToAddUser() {
    this.router.navigate(['users/form']);
  }

  onDeleteUser(id: String, name: string) {
    this.confirmationService.confirm({
      message: `Do you want to delete ${name} User?`,
      header: 'Delete User',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this._deleteUser(id);
      },
      reject: () => {
      }
    });

  }

  onEditUser(id: String) {
    this.router.navigateByUrl(`users/form/${id}`);
  }


  private _deleteUser(id: String) {
    // this.userService.deleteUser(id).subscribe((res) => {
    //   if (res?.success) {
    //     this._getUsers();
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User Deleted Successfully' });
    //   } else {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: "Something went Wrong!" });
    //   }
    // }, error => {
    //   this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message ?? "Something went Wrong!" });
    // });
  }
}
