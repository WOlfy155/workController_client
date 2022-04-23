import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserController} from "../../../controller/UserController";
import {UserWeb} from "../../../models/user-web";
import {SubSink} from "../../../util/SubSink";
import {filter, tap} from "rxjs";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserDialogComponent, UserDialogData} from "../../../components/user-dialog/user-dialog.component";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserWeb[] = []
  displayedColumns: string[] = ['fullName', 'username', 'workingFrom', 'role'];

  private subs = new SubSink();
  //@ts-ignore
  private dialogRef: MatDialogRef<UserDialogComponent,UserDialogData>;

  constructor(
    private dialog: MatDialog,
    private userController: UserController,
  ) { }

  ngOnInit() {
    this.subs.sink = this.userController.loadAllUsers().pipe(
      tap(allUsers => this.users = allUsers),
    ).subscribe();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  formatDate(workingFrom: Date) {
    return new Date(workingFrom).toLocaleDateString();
  }

  createUser() {
    this.dialogRef = this.dialog.open(UserDialogComponent);
    this.subs.sink = this.dialogRef.afterClosed().pipe(
      filter(userData => !!userData),
      //@ts-ignore
      filter(userData => userData.isCreated),
      //@ts-ignore
      tap(user => this.users.push(user)),
    ).subscribe();
  }
}
