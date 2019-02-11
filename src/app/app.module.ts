import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FusionChartsModule } from 'angular-fusioncharts';
import FusionCharts from 'fusioncharts/core';
import Column2D from 'fusioncharts/viz/column2d';
import Line from 'fusioncharts/viz/line';
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
import { NewsComponent } from './news/news.component';
import { HttpModule } from '@angular/http';


FusionChartsModule.fcRoot(FusionCharts,Line);

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
    NewsComponent
  ],
  imports: [
    BrowserModule,
    FusionChartsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
