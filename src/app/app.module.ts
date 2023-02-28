import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import {BadgeModule} from 'primeng/badge';
import {ChartModule} from 'primeng/chart';
import { AppConfigService } from './core/services/app.config.service';
import { GlobalStatsComponent } from './pages/global-stats/global-stats.component';
import { ChartComponent } from './pages/charts/chart.component';
import { ItemCountComponent } from './pages/item-count/item-count.component';
import { DetailledStatsComponent } from './pages/detailled-stats/detailled-stats.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent,GlobalStatsComponent,ChartComponent,ItemCountComponent,DetailledStatsComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,BadgeModule,ChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
