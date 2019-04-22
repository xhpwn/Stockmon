import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { routing } from './app-routing.module';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListviewComponent } from './listview/listview.component';
import { StocksComponent } from './stocks/stocks.component';
import { CryptoComponent } from './crypto/crypto.component';
import { ForexComponent } from './forex/forex.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ReportFeedbackComponent } from './reportfeedback/reportfeedback.component';
import { NewsComponent } from './news/news.component';
import { HttpModule } from '@angular/http';
import { ChartComponent } from './chart/chart.component';
import { PiechartComponent } from './piechart/piechart.component';

import { FusionChartsModule } from 'angular-fusioncharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load fusion theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import { LoggedhomeComponent } from './loggedhome/loggedhome.component';
import { DashboardchildComponent } from './dashboardchild/dashboardchild.component';
import { ForexchildComponent } from './forexchild/forexchild.component';

// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    DashboardComponent,
    ListviewComponent,
    StocksComponent,
    CryptoComponent,
    ForexComponent,
    PreferencesComponent,
    ReportFeedbackComponent,
    NewsComponent,
    ChartComponent,
    PiechartComponent,
    LoggedhomeComponent,
    DashboardchildComponent,
    ForexchildComponent
  ],
  imports: [
    BrowserModule,
    FusionChartsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule,
    Ng2GoogleChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
