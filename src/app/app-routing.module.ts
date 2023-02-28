import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailledStatsComponent } from './pages/detailled-stats/detailled-stats.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'country-stats/:id',
    component: DetailledStatsComponent,
  },
  {
    path: '**', // wildcard
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}