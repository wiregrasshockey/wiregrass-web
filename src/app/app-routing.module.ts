import { LoginComponent } from './login/login.component';
import { PhotoAttributionComponent } from './photo-attribution/photo-attribution.component';
import { GamesComponent } from './games/games.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TeamsComponent } from './teams/teams.component';
import { HomeComponent } from './home/home.component';
import { PlayersComponent } from './players/players.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'teams',
    component: TeamsComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'players/:playerId',
    component: PlayersComponent
  },
  {
    path: 'games/:gameId',
    component: GamesComponent
  },
  {
    path: 'photo-attribution',
    component: PhotoAttributionComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
