import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {HeaderComponent} from "./header/header.component";
import {MatIconModule} from "@angular/material/icon";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule
  ],
  exports: [
    MenuComponent,
    HeaderComponent
  ]
})
export class ComponentsModule{}
