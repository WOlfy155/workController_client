import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import {ComponentsModule} from "../../components/Components";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule
  ]
})
export class MainModule { }
