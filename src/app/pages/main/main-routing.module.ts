import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

const routes: Routes = [
  { path: 'master', loadChildren: () => import('./master/master.module').then(x => x.MasterModule)},
  { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(x => x.CalendarModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule{

}

