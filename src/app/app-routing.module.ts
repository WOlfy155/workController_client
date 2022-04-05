import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {MasterComponent} from "./sub_pages/master/master.component";

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'master', component: MasterComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
