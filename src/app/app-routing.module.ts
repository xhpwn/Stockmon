import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StocksComponent } from './stocks/stocks.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { ReportFeedbackComponent } from './reportfeedback/reportfeedback.component';
import { LoggedhomeComponent } from './loggedhome/loggedhome.component';
import { CryptoComponent } from './crypto/crypto.component';
import { ForexComponent } from './forex/forex.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stocks', component: StocksComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'reportfeedback', component: ReportFeedbackComponent},
  { path: 'loggedhome', component: LoggedhomeComponent },
  { path: 'crypto', component: CryptoComponent },
  { path: 'forex', component: ForexComponent }
];

export const routing = RouterModule.forRoot(routes);
