import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {HeaderComponent} from "./header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {AppRoutingModule} from "../app-routing.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingModule,
    MatIconModule,
    CommonModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent
  ]
})
export class ComponentsModule{}
