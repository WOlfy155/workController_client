import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MasterComponent} from "./master.component";

const routes: Routes = [
  {path: '', component: MasterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule{}
