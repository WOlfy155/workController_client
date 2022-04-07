import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {MasterComponent} from "./pages/main/master/master.component";
import {CalendarComponent} from "./pages/main/calendar/calendar.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  // {path: 'main', loadChildren: () => import("./pages/main/main.module").then(x => x.MainModule)}
  {path: 'main', component: MainComponent , children: [
      {path: 'master', component: MasterComponent},
      {path: 'calendar', component: CalendarComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
