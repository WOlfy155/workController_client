import {APP_INITIALIZER, NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NZ_DATE_CONFIG, NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {MatCardModule} from "@angular/material/card";
import {MasterComponent} from "./pages/main/master/master.component";
import {CalendarComponent} from "./pages/main/calendar/calendar.component";
import {NzCalendarModule} from "ng-zorro-antd/calendar";
import {MainComponent} from "./pages/main/main.component";
import {ComponentsModule} from "./components/Components";
import {ProjectsComponent} from "./pages/main/projects/projects.component";
import {StatisticsComponent} from "./pages/main/statistics/statistics.component";
import {MatIconModule} from "@angular/material/icon";
import {ProjectDialogComponent} from './components/project-dialog/project-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './pages/login/login.component';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import {LoginService, LoginServiceFactory} from "./services/login.service";

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    CalendarComponent,
    MainComponent,
    ProjectsComponent,
    StatisticsComponent,
    ProjectDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    NzCalendarModule,
    ComponentsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [
    LoginService,
    {provide: APP_INITIALIZER, useFactory: LoginServiceFactory, deps: [LoginService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    { provide: NZ_I18N, useValue: ru_RU },
    { provide: NZ_DATE_CONFIG, useValue: { firstDayOfWeek: 1 } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
