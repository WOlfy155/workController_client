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
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    TaskDialogComponent
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
    ],
  exports: [
    MenuComponent,
    HeaderComponent,
    TaskDialogComponent
  ]
})
export class ComponentsModule{}
