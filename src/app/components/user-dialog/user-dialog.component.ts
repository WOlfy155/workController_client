import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserWeb} from "../../models/user-web";
import {WorkRole} from "../../models/enums/work-role";
import {rndNumberId} from "../../util/RndUtil";
import {UserController} from "../../controller/UserController";
import {SubSink} from "../../util/SubSink";
import {MatDialogRef} from "@angular/material/dialog";
import {tap} from "rxjs";

export interface UserDialogData{
  user: UserWeb,
  isCreated: boolean,
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit, OnDestroy {

  user: UserWeb = {
    id: rndNumberId(),
    username: '',
    fullName: '',
    password: '',
    workingFrom: new Date(),
    profileImgUrl: '',
    role: WorkRole.MANAGER,
    tasks: []
  };

  private subs = new SubSink();

  constructor(
    private userController: UserController,
    private dialogRef: MatDialogRef<UserDialogComponent, UserDialogData>
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  saveUser() {
    this.subs.sink = this.userController.upsertUser(this.user).pipe(
      tap(() =>{
        this.dialogRef.close({
          user: this.user,
          isCreated: true
        })
      })
    ).subscribe();

  }

  cancel() {

  }
}
