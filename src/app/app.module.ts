import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NZ_DATE_CONFIG, NZ_I18N, ru_RU} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import ru from '@angular/common/locales/ru';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {MatCardModule} from "@angular/material/card";
import {MasterComponent} from "./pages/main/master/master.component";
import {CalendarComponent} from "./pages/main/calendar/calendar.component";
import {NzCalendarModule} from "ng-zorro-antd/calendar";

registerLocaleData(ru);

@NgModule({
  declarations: [
    AppComponent,
    MasterComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    NzCalendarModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: ru_RU },
    { provide: NZ_DATE_CONFIG, useValue: { firstDayOfWeek: 1 } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
