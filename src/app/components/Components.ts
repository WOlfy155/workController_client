import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {HeaderComponent} from "./header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "../app-routing.module";
import {CommonModule} from "@angular/common";
import {TaskDialogComponent} from "./task-dialog/task-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SaveButtonsComponent} from "./save-buttons/save-buttons.component";
import {MatButtonModule} from "@angular/material/button";
import {UserDialogComponent} from "./user-dialog/user-dialog.component";

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    TaskDialogComponent,
    SaveButtonsComponent,
    UserDialogComponent
  ],
  imports: [
    AppRoutingModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    NzDatePickerModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  exports: [
    MenuComponent,
    HeaderComponent,
    TaskDialogComponent,
    SaveButtonsComponent,
  ]
})
export class ComponentsModule{}
