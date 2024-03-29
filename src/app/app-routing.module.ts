import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./pages/main/main.component";
import {MasterComponent} from "./pages/main/master/master.component";
import {CalendarComponent} from "./pages/main/calendar/calendar.component";
import {ProjectsComponent} from "./pages/main/projects/projects.component";
import {StatisticsComponent} from "./pages/main/statistics/statistics.component";
import {LoginComponent} from "./pages/login/login.component";
import {LoginGuard, MainGuard} from "./pages/login/login.guard";
import {UserListComponent} from "./pages/main/user-list/user-list.component";
import {NewsComponent} from "./pages/main/news/news.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'main', component: MainComponent , canActivate: [MainGuard], children: [
      {path:'', redirectTo: 'master', pathMatch: 'full'},
      {path: 'master', component: MasterComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'news', component: NewsComponent},
      {path: 'statistics', component: StatisticsComponent},
      {path: 'user-list', component: UserListComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
